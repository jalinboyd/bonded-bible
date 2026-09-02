/**
 * Bible Sequence — UI controller
 * -----------------------------------------------------------------------
 * Wires the pure engine (engine.js) to the DOM. Handles the three
 * screens (start / round / results), the reorderable card list
 * (drag on pointer move, tap-to-select-and-swap as a fallback), the
 * daily "already played" lock, and the share flow.
 */
(function () {
  "use strict";
/**
 * Bible Sequence — UI controller
 * -----------------------------------------------------------------------
 * Wires the game to the DOM. Handles the three screens (start / round /
 * results), the reorderable card list (drag on pointer move, tap-to-
 * select-and-swap as a fallback), the daily "already played" lock, and
 * the share flow.
 *
 * BACKEND / NO-BACKEND: on load, this tries fetching today's challenge
 * from the Netlify functions in /netlify/functions (a real Supabase-
 * backed daily challenge with server-verified scoring and a real
 * leaderboard). If that fails — no backend deployed, offline, whatever —
 * it falls back automatically to computing today's challenge locally
 * with engine.js, exactly like the no-backend version. Either way the
 * game plays identically; only the scoring/leaderboard machinery
 * underneath differs. See MODE below.
 */
(function () {
  "use strict";

  const GAP = 8; // must match .card-list gap in styles.css
  const TOTAL_ROUNDS = BibleSequenceEngine.ROUNDS_PER_GAME;
  const API_BASE = "/.netlify/functions";

  const els = {
    screens: {
      start: document.getElementById("screen-start"),
      round: document.getElementById("screen-round"),
      results: document.getElementById("screen-results"),
    },
    btnStart: document.getElementById("btn-start"),
    todayLabel: document.getElementById("today-label"),
    todayMix: document.getElementById("today-mix"),
    roundCount: document.getElementById("round-count"),
    progressFill: document.getElementById("progress-fill"),
    storyName: document.getElementById("story-name"),
    cardList: document.getElementById("card-list"),
    dragHint: document.getElementById("drag-hint"),
    storyContext: document.getElementById("story-context"),
    storyContextText: document.getElementById("story-context-text"),
    btnLockIn: document.getElementById("btn-lock-in"),
    resultsEyebrow: document.getElementById("results-eyebrow"),
    finalScore: document.getElementById("final-score"),
    finalPercent: document.getElementById("final-percent"),
    finalMessage: document.getElementById("final-message"),
    roundBreakdown: document.getElementById("round-breakdown"),
    leaderboardBlock: document.getElementById("results-leaderboard"),
    leaderboardCount: document.getElementById("leaderboard-count"),
    leaderboardList: document.getElementById("leaderboard-list"),
    btnShare: document.getElementById("btn-share"),
    btnPlayAgain: document.getElementById("btn-play-again"),
    toast: document.getElementById("toast"),
  };

  // ---------------------------------------------------------------
  // Anonymous player id
  // -----------------------------------------------------------------
  function getPlayerId() {
    let id = localStorage.getItem("bsPlayerId");
    if (!id) {
      id =
        "player_" +
        Math.random().toString(36).slice(2, 10) +
        Date.now().toString(36);
      localStorage.setItem("bsPlayerId", id);
    }
    return id;
  }
  const playerId = getPlayerId();

  // ---------------------------------------------------------------
  // Game/session state
  // -----------------------------------------------------------------
  let MODE = "local"; // "backend" | "local" — decided once, during init()
  let challengeId = null; // only set in backend mode
  let dateKey = null; // the day this challenge belongs to (server's UTC
  // date in backend mode, the player's local date in local mode) — used
  // as the "already played today" localStorage key either way.
  let todaysRounds = []; // unified shape, see normalizeRound()

  let game = null; // { roundIndex, roundScores, answers }
  let roundState = null; // per-round interactive card state

  // ---------------------------------------------------------------
  // Fetch helpers
  // -----------------------------------------------------------------
  async function apiGet(path) {
    const res = await fetch(`${API_BASE}/${path}`);
    if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
    return res.json();
  }
  async function apiPost(path, body) {
    const res = await fetch(`${API_BASE}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && res.status !== 409) throw new Error(data.error || `POST ${path} failed (${res.status})`);
    return { status: res.status, data };
  }

  /** Normalize a backend round or a local engine round into one shape
   *  the rest of the UI code can treat identically. Local-mode rounds
   *  additionally carry `correctOrderIds` and each card's `reference`,
   *  since local mode has to check its own answers. */
  function normalizeBackendRound(r) {
    return {
      storyName: r.storyName,
      storyDescription: r.storyDescription,
      category: r.category,
      difficulty: r.difficulty,
      cards: r.cards.map((c) => ({ id: c.eventId, title: c.text })),
    };
  }
  function normalizeLocalRound(r) {
    return {
      storyName: r.storyName,
      storyDescription: r.storyDescription,
      category: r.category,
      difficulty: r.difficulty,
      correctOrderIds: r.correctOrderIds,
      cards: r.cards.map((c) => ({ id: c.id, title: c.title, reference: c.reference })),
    };
  }

  async function initTodaysChallenge() {
    try {
      const payload = await apiGet("get-daily-challenge");
      MODE = "backend";
      challengeId = payload.challengeId;
      dateKey = payload.date;
      todaysRounds = payload.rounds
        .sort((a, b) => a.roundNumber - b.roundNumber)
        .map(normalizeBackendRound);
      return;
    } catch (err) {
      // No backend deployed, offline, or misconfigured — fall back to
      // the fully client-side version. The game still works the same.
      MODE = "local";
      dateKey = BibleSequenceEngine.todaySeedKey();
      todaysRounds = BibleSequenceEngine.generateGame(dateKey).map(normalizeLocalRound);
    }
  }

  function todayResultKey() {
    return `bsResult:${dateKey}`;
  }
  function loadTodayResult() {
    try {
      const raw = localStorage.getItem(todayResultKey());
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }
  function saveTodayResult(result) {
    try {
      localStorage.setItem(todayResultKey(), JSON.stringify(result));
    } catch (err) {
      // localStorage unavailable — the game still works, it just won't
      // remember the result on reload.
    }
  }

  // ---------------------------------------------------------------
  // Screen management
  // ---------------------------------------------------------------
  function showScreen(name) {
    for (const key of Object.keys(els.screens)) {
      els.screens[key].hidden = key !== name;
    }
    window.scrollTo(0, 0);
  }

  // ---------------------------------------------------------------
  // Start screen
  // ---------------------------------------------------------------
  function renderStartScreen() {
    if (els.todayLabel) {
      const dateStr = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      els.todayLabel.textContent = `${dateStr} · new stories tomorrow`;
    }
    if (els.todayMix) {
      const otCount = todaysRounds.filter((r) => r.category === "OLD_TESTAMENT").length;
      const ntCount = TOTAL_ROUNDS - otCount;
      const avgDifficulty = todaysRounds.reduce((sum, r) => sum + r.difficulty, 0) / TOTAL_ROUNDS;
      const difficultyLabel = avgDifficulty < 1.5 ? "Easy" : avgDifficulty < 2.5 ? "Moderate" : "Difficult";
      els.todayMix.textContent = `${otCount} Old Testament · ${ntCount} New Testament · ${difficultyLabel} difficulty`;
    }

    const existing = loadTodayResult();
    if (existing) {
      els.btnStart.textContent = "VIEW TODAY'S RESULT";
      els.btnStart.onclick = () => renderResultsFromData(existing, true);
    } else {
      els.btnStart.textContent = "PLAY TODAY'S CHALLENGE";
      els.btnStart.onclick = startGame;
    }
  }

  // ---------------------------------------------------------------
  // Game flow
  // ---------------------------------------------------------------
  function startGame() {
    const existing = loadTodayResult();
    if (existing) {
      renderResultsFromData(existing, true);
      return;
    }
    game = { roundIndex: 0, roundScores: [], answers: [] };
    showScreen("round");
    renderRound();
  }

  function renderRound() {
    const round = todaysRounds[game.roundIndex];
    const roundNum = game.roundIndex + 1;

    els.roundCount.textContent = `ROUND ${roundNum} OF ${TOTAL_ROUNDS}`;
    els.progressFill.style.width = `${(game.roundIndex / TOTAL_ROUNDS) * 100}%`;
    els.storyName.textContent = `THE STORY OF ${round.storyName.toUpperCase()}`;
    els.dragHint.hidden = false;
    els.dragHint.textContent = "Drag a card, or tap two cards to swap them.";
    els.storyContext.hidden = true;

    els.btnLockIn.textContent = "LOCK IN ANSWER";
    els.btnLockIn.disabled = false;
    els.btnLockIn.onclick = onLockIn;

    roundState = {
      order: round.cards.map((c) => c.id),
      cardsById: Object.fromEntries(round.cards.map((c) => [c.id, c])),
      locked: false,
      selectedId: null,
      rowHeight: 0,
    };

    buildCardDom(round);
    layoutCards(false);
  }

  function buildCardDom(round) {
    els.cardList.innerHTML = "";
    els.cardList.style.position = "relative";

    roundState.order.forEach((id) => {
      const card = roundState.cardsById[id];
      const li = document.createElement("li");
      li.className = "seq-card";
      li.dataset.id = id;
      li.style.position = "absolute";
      li.style.left = "0";
      li.style.right = "0";
      li.style.transition = "top 220ms ease, background 150ms ease";
      li.innerHTML = `
        <span class="slot"></span>
        <span class="mark"></span>
        <span class="body">
          <p class="card-title"></p>
          <p class="card-ref"></p>
        </span>
        <span class="grip" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="5" cy="4" r="1.3" fill="currentColor"/>
            <circle cx="11" cy="4" r="1.3" fill="currentColor"/>
            <circle cx="5" cy="8" r="1.3" fill="currentColor"/>
            <circle cx="11" cy="8" r="1.3" fill="currentColor"/>
            <circle cx="5" cy="12" r="1.3" fill="currentColor"/>
            <circle cx="11" cy="12" r="1.3" fill="currentColor"/>
          </svg>
        </span>
      `;
      li.querySelector(".card-title").textContent = card.title;
      // Reference is withheld during play — chapter/verse numbers would
      // give away the order. It's revealed after Lock In.
      li.querySelector(".card-ref").textContent = "";
      li.addEventListener("pointerdown", onCardPointerDown);
      els.cardList.appendChild(li);
    });

    let maxHeight = 0;
    els.cardList.querySelectorAll(".seq-card").forEach((el) => {
      el.style.position = "static";
    });
    els.cardList.querySelectorAll(".seq-card").forEach((el) => {
      maxHeight = Math.max(maxHeight, el.getBoundingClientRect().height);
    });
    els.cardList.querySelectorAll(".seq-card").forEach((el) => {
      el.style.position = "absolute";
    });

    roundState.rowHeight = Math.ceil(maxHeight) + GAP;
    const n = roundState.order.length;
    els.cardList.style.height = `${roundState.rowHeight * n - GAP}px`;
  }

  function slotTop(index) {
    return index * roundState.rowHeight;
  }

  function layoutCards(animate) {
    roundState.order.forEach((id, index) => {
      const el = els.cardList.querySelector(`.seq-card[data-id="${id}"]`);
      if (!el) return;
      el.style.transition = animate ? "top 220ms ease, background 150ms ease" : "none";
      el.style.top = `${slotTop(index)}px`;
      const slotEl = el.querySelector(".slot");
      if (slotEl) slotEl.textContent = String(index + 1);
    });
  }

  // ---------------------------------------------------------------
  // Drag + tap-to-swap interaction
  // ---------------------------------------------------------------
  function onCardPointerDown(e) {
    if (roundState.locked) return;
    const el = e.currentTarget;
    const id = el.dataset.id;
    el.setPointerCapture(e.pointerId);

    const startY = e.clientY;
    const startIndex = roundState.order.indexOf(id);
    let currentIndex = startIndex;
    let dragging = false;
    const DRAG_THRESHOLD = 6;

    function onMove(ev) {
      const deltaY = ev.clientY - startY;

      if (!dragging && Math.abs(deltaY) > DRAG_THRESHOLD) {
        dragging = true;
        el.classList.add("dragging");
        el.style.transition = "none";
        el.style.zIndex = "5";
        clearSelection();
      }
      if (!dragging) return;

      const newTop = slotTop(startIndex) + deltaY;
      el.style.top = `${newTop}px`;

      const proposedIndex = Math.max(
        0,
        Math.min(roundState.order.length - 1, Math.round(newTop / roundState.rowHeight))
      );
      if (proposedIndex !== currentIndex) {
        roundState.order.splice(currentIndex, 1);
        roundState.order.splice(proposedIndex, 0, id);
        currentIndex = proposedIndex;
        roundState.order.forEach((otherId, index) => {
          if (otherId === id) return;
          const otherEl = els.cardList.querySelector(`.seq-card[data-id="${otherId}"]`);
          if (!otherEl) return;
          otherEl.style.transition = "top 180ms ease";
          otherEl.style.top = `${slotTop(index)}px`;
          const slotEl = otherEl.querySelector(".slot");
          if (slotEl) slotEl.textContent = String(index + 1);
        });
      }
    }

    function onUp(ev) {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);

      if (dragging) {
        el.classList.remove("dragging");
        el.style.zIndex = "";
        el.style.transition = "top 180ms ease, background 150ms ease";
        el.style.top = `${slotTop(currentIndex)}px`;
        const slotEl = el.querySelector(".slot");
        if (slotEl) slotEl.textContent = String(currentIndex + 1);
      } else {
        handleTap(id, el);
      }
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  }

  function handleTap(id, el) {
    if (roundState.selectedId === null) {
      roundState.selectedId = id;
      el.classList.add("selected");
      return;
    }
    if (roundState.selectedId === id) {
      clearSelection();
      return;
    }
    const otherId = roundState.selectedId;
    const a = roundState.order.indexOf(otherId);
    const b = roundState.order.indexOf(id);
    [roundState.order[a], roundState.order[b]] = [roundState.order[b], roundState.order[a]];
    clearSelection();
    layoutCards(true);
  }

  function clearSelection() {
    if (roundState.selectedId === null) return;
    const prevEl = els.cardList.querySelector(`.seq-card[data-id="${roundState.selectedId}"]`);
    if (prevEl) prevEl.classList.remove("selected");
    roundState.selectedId = null;
  }

  // ---------------------------------------------------------------
  // Lock in / scoring
  // ---------------------------------------------------------------
  async function onLockIn() {
    if (roundState.locked) return;
    const round = todaysRounds[game.roundIndex];
    const roundNumber = game.roundIndex + 1;
    const submittedOrder = roundState.order.slice();

    let results, score;
    if (MODE === "backend") {
      els.btnLockIn.disabled = true;
      els.btnLockIn.textContent = "CHECKING…";
      try {
        const { data } = await apiPost("check-round-answer", {
          challengeId,
          roundNumber,
          orderedEventIds: submittedOrder,
        });
        results = data.results; // [{id, correct, reference}]
        score = data.score;
      } catch (err) {
        // Transient network issue — let them retry rather than losing
        // their arrangement or silently getting it wrong.
        els.btnLockIn.disabled = false;
        els.btnLockIn.textContent = "LOCK IN ANSWER";
        showToast("Couldn't reach the server — try again.");
        return;
      }
    } else {
      const checked = BibleSequenceEngine.checkAnswer(round, submittedOrder);
      results = checked.results.map((r) => ({
        id: r.id,
        correct: r.correct,
        reference: roundState.cardsById[r.id].reference,
      }));
      score = checked.score;
    }

    roundState.locked = true;
    clearSelection();
    els.dragHint.hidden = true;
    game.roundScores.push(score);
    game.answers.push({ roundNumber, orderedEventIds: submittedOrder });

    results.forEach((r) => {
      const el = els.cardList.querySelector(`.seq-card[data-id="${r.id}"]`);
      if (!el) return;
      el.classList.add(r.correct ? "correct" : "wrong");
      el.querySelector(".mark").textContent = r.correct ? "✓" : "✕";
      el.querySelector(".card-ref").textContent = r.reference || "";
    });

    els.btnLockIn.disabled = false;
    els.btnLockIn.textContent =
      game.roundIndex === TOTAL_ROUNDS - 1
        ? `${score}/4 CORRECT — SEE RESULTS`
        : `${score}/4 CORRECT — NEXT ROUND`;
    els.btnLockIn.onclick = advanceRound;

    els.storyContextText.textContent = round.storyDescription || "";
    els.storyContext.hidden = !round.storyDescription;
  }

  function advanceRound() {
    game.roundIndex += 1;
    if (game.roundIndex >= TOTAL_ROUNDS) {
      els.progressFill.style.width = "100%";
      showResults();
    } else {
      renderRound();
    }
  }

  // ---------------------------------------------------------------
  // Results
  // ---------------------------------------------------------------
  async function showResults() {
    const localTotal = game.roundScores.reduce((a, b) => a + b, 0);
    const maxScore = TOTAL_ROUNDS * 4;
    const breakdown = todaysRounds.map((round, i) => ({
      storyName: round.storyName,
      score: game.roundScores[i],
    }));

    let total = localTotal;

    if (MODE === "backend") {
      try {
        const { status, data } = await apiPost("submit-score", {
          anonymousKey: playerId,
          challengeId,
          answers: game.answers,
        });
        if (status === 200) {
          total = data.score; // server-authoritative score
        } else if (status === 409 && typeof data.score === "number") {
          // Already had an official result (e.g. localStorage was
          // cleared but the server remembers) — show that instead.
          total = data.score;
        }
      } catch (err) {
        // Couldn't reach the server to record the official score —
        // still show the player their (unofficial) local result rather
        // than losing the game they just finished.
        showToast("Couldn't save your score to the server — showing it locally.");
      }
    }

    const percent = Math.round((total / maxScore) * 100);
    const message = BibleSequenceEngine.scoreMessage(percent);

    const resultData = {
      playerId,
      dateKey,
      total,
      maxScore,
      percent,
      message,
      breakdown,
      completedAt: Date.now(),
    };
    saveTodayResult(resultData);

    renderResultsFromData(resultData, false);
    animateScoreCountUp(total, maxScore);
  }

  async function renderResultsFromData(data, alreadyPlayed) {
    showScreen("results");
    if (els.resultsEyebrow) {
      els.resultsEyebrow.textContent = alreadyPlayed ? "TODAY'S RESULT" : "YOUR FINAL SCORE";
    }
    els.finalScore.textContent = `${data.total}/${data.maxScore}`;
    els.finalPercent.textContent = `${data.percent}%`;
    els.finalMessage.textContent = data.message;

    els.roundBreakdown.innerHTML = "";
    data.breakdown.forEach((round, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="rb-story">Round ${i + 1} — ${round.storyName}</span>
        <span class="rb-score">${round.score}/4</span>
      `;
      els.roundBreakdown.appendChild(li);
    });

    els.btnPlayAgain.hidden = alreadyPlayed;
    game = game || { roundScores: data.breakdown.map((r) => r.score) };

    if (MODE === "backend" && els.leaderboardBlock) {
      renderLeaderboard();
    } else if (els.leaderboardBlock) {
      els.leaderboardBlock.hidden = true;
    }
  }

  async function renderLeaderboard() {
    try {
      const data = await apiGet(`get-leaderboard?date=${encodeURIComponent(dateKey)}`);
      els.leaderboardBlock.hidden = false;
      const count = data.playerCount || 0;
      els.leaderboardCount.textContent =
        count === 1 ? "1 person has played today" : `${count} people have played today`;
      els.leaderboardList.innerHTML = "";
      (data.topScores || []).slice(0, 10).forEach((row, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="rb-story">${i + 1}. ${escapeHtml(row.display_name || "Player")}</span>
          <span class="rb-score">${row.score}/20</span>
        `;
        els.leaderboardList.appendChild(li);
      });
    } catch (err) {
      // Leaderboard is a nice-to-have — don't let a failed fetch break
      // the results screen the player is trying to see.
      els.leaderboardBlock.hidden = true;
    }
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function animateScoreCountUp(total, maxScore) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const duration = 500;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const shown = Math.round(t * total);
      els.finalScore.textContent = `${shown}/${maxScore}`;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---------------------------------------------------------------
  // Share
  // ---------------------------------------------------------------
  async function shareResult() {
    const stored = loadTodayResult();
    const total = stored ? stored.total : 0;
    const maxScore = stored ? stored.maxScore : TOTAL_ROUNDS * 4;
    const url = window.location.href.split("#")[0].split("?")[0];
    const text = `I scored ${total}/${maxScore} on today's Bible Sequence. Can you beat me?`;

    if (navigator.share) {
      try {
        await navigator.share({ text, url, title: "Bible Sequence" });
      } catch (err) {
        // user cancelled the share sheet
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      showToast("Link copied!");
    } catch (err) {
      showToast("Copy this link: " + url);
    }
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      els.toast.hidden = true;
    }, 2200);
  }

  // ---------------------------------------------------------------
  // Wire up + boot
  // ---------------------------------------------------------------
  els.btnShare.addEventListener("click", shareResult);
  els.btnPlayAgain.addEventListener("click", () => {
    game = { roundIndex: 0, roundScores: [], answers: [] };
    showScreen("round");
    renderRound();
  });

  (async function init() {
    await initTodaysChallenge();
    renderStartScreen();
  })();
})();

  const GAP = 8; // must match .card-list gap in styles.css
  const TOTAL_ROUNDS = BibleSequenceEngine.ROUNDS_PER_GAME;

  const els = {
    screens: {
      start: document.getElementById("screen-start"),
      round: document.getElementById("screen-round"),
      results: document.getElementById("screen-results"),
    },
    btnStart: document.getElementById("btn-start"),
    todayLabel: document.getElementById("today-label"),
    todayMix: document.getElementById("today-mix"),
    roundCount: document.getElementById("round-count"),
    progressFill: document.getElementById("progress-fill"),
    storyName: document.getElementById("story-name"),
    cardList: document.getElementById("card-list"),
    dragHint: document.getElementById("drag-hint"),
    storyContext: document.getElementById("story-context"),
    storyContextText: document.getElementById("story-context-text"),
    btnLockIn: document.getElementById("btn-lock-in"),
    resultsEyebrow: document.getElementById("results-eyebrow"),
    finalScore: document.getElementById("final-score"),
    finalPercent: document.getElementById("final-percent"),
    finalMessage: document.getElementById("final-message"),
    roundBreakdown: document.getElementById("round-breakdown"),
    btnShare: document.getElementById("btn-share"),
    btnPlayAgain: document.getElementById("btn-play-again"),
    toast: document.getElementById("toast"),
  };

  const dateKey = BibleSequenceEngine.todaySeedKey();

  // ---------------------------------------------------------------
  // Anonymous player id + "one official result per day" (client-side)
  // -----------------------------------------------------------------
  // This is a soft lock: it's stored in this browser's localStorage, so
  // clearing storage or switching browsers resets it. A tamper-proof,
  // cross-device version of this same rule lives in /backend — see
  // /backend/README.md. For a friendly group-chat game this local
  // version is enough to stop accidental "let me try again" replays.
  function getPlayerId() {
    let id = localStorage.getItem("bsPlayerId");
    if (!id) {
      id =
        "player_" +
        Math.random().toString(36).slice(2, 10) +
        Date.now().toString(36);
      localStorage.setItem("bsPlayerId", id);
    }
    return id;
  }

  function todayResultKey() {
    return `bsResult:${dateKey}`;
  }

  function loadTodayResult() {
    try {
      const raw = localStorage.getItem(todayResultKey());
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function saveTodayResult(result) {
    try {
      localStorage.setItem(todayResultKey(), JSON.stringify(result));
    } catch (err) {
      // localStorage unavailable (private browsing, etc.) — the game
      // still works, it just won't remember the result on reload.
    }
  }

  const playerId = getPlayerId();

  /** @type {{rounds: any[], roundIndex: number, roundScores: number[]}} */
  let game = null;

  /** Per-round interactive state for the card list. */
  let roundState = null;

  // Today's 5 rounds are generated once, deterministically, from the
  // date — every player gets this exact same set today.
  const todaysRounds = BibleSequenceEngine.generateGame(dateKey);

  // ---------------------------------------------------------------
  // Screen management
  // ---------------------------------------------------------------
  function showScreen(name) {
    for (const key of Object.keys(els.screens)) {
      els.screens[key].hidden = key !== name;
    }
    window.scrollTo(0, 0);
  }

  // ---------------------------------------------------------------
  // Start screen — today's date + mix, and the "already played" state
  // ---------------------------------------------------------------
  function renderStartScreen() {
    if (els.todayLabel) {
      const dateStr = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      els.todayLabel.textContent = `${dateStr} · new stories tomorrow`;
    }

    if (els.todayMix) {
      const otCount = todaysRounds.filter(
        (r) => r.category === "OLD_TESTAMENT"
      ).length;
      const ntCount = TOTAL_ROUNDS - otCount;
      const avgDifficulty =
        todaysRounds.reduce((sum, r) => sum + r.difficulty, 0) / TOTAL_ROUNDS;
      const difficultyLabel =
        avgDifficulty < 1.5 ? "Easy" : avgDifficulty < 2.5 ? "Moderate" : "Difficult";
      els.todayMix.textContent = `${otCount} Old Testament · ${ntCount} New Testament · ${difficultyLabel} difficulty`;
    }

    const existing = loadTodayResult();
    if (existing) {
      els.btnStart.textContent = "VIEW TODAY'S RESULT";
      els.btnStart.onclick = () => renderResultsFromData(existing, true);
    } else {
      els.btnStart.textContent = "PLAY TODAY'S CHALLENGE";
      els.btnStart.onclick = startGame;
    }
  }

  // ---------------------------------------------------------------
  // Game flow
  // ---------------------------------------------------------------
  function startGame() {
    // Already played today? Don't allow a second official run —
    // send them to their existing result instead.
    const existing = loadTodayResult();
    if (existing) {
      renderResultsFromData(existing, true);
      return;
    }

    game = {
      rounds: todaysRounds,
      roundIndex: 0,
      roundScores: [],
    };
    showScreen("round");
    renderRound();
  }

  function renderRound() {
    const round = game.rounds[game.roundIndex];
    const roundNum = game.roundIndex + 1;

    els.roundCount.textContent = `ROUND ${roundNum} OF ${TOTAL_ROUNDS}`;
    els.progressFill.style.width = `${(game.roundIndex / TOTAL_ROUNDS) * 100}%`;
    els.storyName.textContent = `THE STORY OF ${round.storyName.toUpperCase()}`;
    els.dragHint.hidden = false;
    els.dragHint.textContent = "Drag a card, or tap two cards to swap them.";
    els.storyContext.hidden = true;

    els.btnLockIn.textContent = "LOCK IN ANSWER";
    els.btnLockIn.disabled = false;
    els.btnLockIn.onclick = onLockIn;

    roundState = {
      order: round.cards.map((c) => c.id),
      cardsById: Object.fromEntries(round.cards.map((c) => [c.id, c])),
      locked: false,
      selectedId: null,
      rowHeight: 0,
    };

    buildCardDom(round);
    layoutCards(false);
  }

  function buildCardDom(round) {
    els.cardList.innerHTML = "";
    els.cardList.style.position = "relative";

    roundState.order.forEach((id) => {
      const card = roundState.cardsById[id];
      const li = document.createElement("li");
      li.className = "seq-card";
      li.dataset.id = id;
      li.style.position = "absolute";
      li.style.left = "0";
      li.style.right = "0";
      li.style.transition = "top 220ms ease, background 150ms ease";
      li.innerHTML = `
        <span class="slot"></span>
        <span class="mark"></span>
        <span class="body">
          <p class="card-title"></p>
          <p class="card-ref"></p>
        </span>
        <span class="grip" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="5" cy="4" r="1.3" fill="currentColor"/>
            <circle cx="11" cy="4" r="1.3" fill="currentColor"/>
            <circle cx="5" cy="8" r="1.3" fill="currentColor"/>
            <circle cx="11" cy="8" r="1.3" fill="currentColor"/>
            <circle cx="5" cy="12" r="1.3" fill="currentColor"/>
            <circle cx="11" cy="12" r="1.3" fill="currentColor"/>
          </svg>
        </span>
      `;
      li.querySelector(".card-title").textContent = card.title;
      // Reference is withheld during play — chapter/verse numbers would
      // give away the order. It's revealed after Lock In (see onLockIn).
      li.querySelector(".card-ref").textContent = "";
      li.addEventListener("pointerdown", onCardPointerDown);
      els.cardList.appendChild(li);
    });

    // Measure the tallest card to get a uniform row height, then
    // switch every card to absolute positioning at its slot.
    let maxHeight = 0;
    els.cardList.querySelectorAll(".seq-card").forEach((el) => {
      el.style.position = "static"; // measure in normal flow first
    });
    els.cardList.querySelectorAll(".seq-card").forEach((el) => {
      maxHeight = Math.max(maxHeight, el.getBoundingClientRect().height);
    });
    els.cardList.querySelectorAll(".seq-card").forEach((el) => {
      el.style.position = "absolute";
    });

    roundState.rowHeight = Math.ceil(maxHeight) + GAP;
    const n = roundState.order.length;
    els.cardList.style.height = `${roundState.rowHeight * n - GAP}px`;
  }

  function slotTop(index) {
    return index * roundState.rowHeight;
  }

  /** Position every card according to roundState.order. */
  function layoutCards(animate) {
    roundState.order.forEach((id, index) => {
      const el = els.cardList.querySelector(`.seq-card[data-id="${id}"]`);
      if (!el) return;
      el.style.transition = animate ? "top 220ms ease, background 150ms ease" : "none";
      el.style.top = `${slotTop(index)}px`;
      const slotEl = el.querySelector(".slot");
      if (slotEl) slotEl.textContent = String(index + 1);
    });
  }

  // ---------------------------------------------------------------
  // Drag + tap-to-swap interaction
  // ---------------------------------------------------------------
  function onCardPointerDown(e) {
    if (roundState.locked) return;
    const el = e.currentTarget;
    const id = el.dataset.id;
    el.setPointerCapture(e.pointerId);

    const startY = e.clientY;
    const startIndex = roundState.order.indexOf(id);
    let currentIndex = startIndex;
    let dragging = false;
    const DRAG_THRESHOLD = 6;

    function onMove(ev) {
      const deltaY = ev.clientY - startY;

      if (!dragging && Math.abs(deltaY) > DRAG_THRESHOLD) {
        dragging = true;
        el.classList.add("dragging");
        el.style.transition = "none";
        el.style.zIndex = "5";
        clearSelection();
      }
      if (!dragging) return;

      const newTop = slotTop(startIndex) + deltaY;
      el.style.top = `${newTop}px`;

      const proposedIndex = Math.max(
        0,
        Math.min(
          roundState.order.length - 1,
          Math.round(newTop / roundState.rowHeight)
        )
      );
      if (proposedIndex !== currentIndex) {
        roundState.order.splice(currentIndex, 1);
        roundState.order.splice(proposedIndex, 0, id);
        currentIndex = proposedIndex;
        roundState.order.forEach((otherId, index) => {
          if (otherId === id) return;
          const otherEl = els.cardList.querySelector(
            `.seq-card[data-id="${otherId}"]`
          );
          if (!otherEl) return;
          otherEl.style.transition = "top 180ms ease";
          otherEl.style.top = `${slotTop(index)}px`;
          const slotEl = otherEl.querySelector(".slot");
          if (slotEl) slotEl.textContent = String(index + 1);
        });
      }
    }

    function onUp(ev) {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);

      if (dragging) {
        el.classList.remove("dragging");
        el.style.zIndex = "";
        el.style.transition = "top 180ms ease, background 150ms ease";
        el.style.top = `${slotTop(currentIndex)}px`;
        const slotEl = el.querySelector(".slot");
        if (slotEl) slotEl.textContent = String(currentIndex + 1);
      } else {
        // It was a tap, not a drag: select / swap.
        handleTap(id, el);
      }
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  }

  function handleTap(id, el) {
    if (roundState.selectedId === null) {
      roundState.selectedId = id;
      el.classList.add("selected");
      return;
    }
    if (roundState.selectedId === id) {
      clearSelection();
      return;
    }
    // Swap the two selected cards' positions.
    const otherId = roundState.selectedId;
    const a = roundState.order.indexOf(otherId);
    const b = roundState.order.indexOf(id);
    [roundState.order[a], roundState.order[b]] = [
      roundState.order[b],
      roundState.order[a],
    ];
    clearSelection();
    layoutCards(true);
  }

  function clearSelection() {
    if (roundState.selectedId === null) return;
    const prevEl = els.cardList.querySelector(
      `.seq-card[data-id="${roundState.selectedId}"]`
    );
    if (prevEl) prevEl.classList.remove("selected");
    roundState.selectedId = null;
  }

  // ---------------------------------------------------------------
  // Lock in / scoring
  // ---------------------------------------------------------------
  function onLockIn() {
    if (roundState.locked) return;
    roundState.locked = true;
    clearSelection();
    els.dragHint.hidden = true;

    const round = game.rounds[game.roundIndex];
    const { results, score } = BibleSequenceEngine.checkAnswer(
      round,
      roundState.order
    );
    game.roundScores.push(score);

    results.forEach((r) => {
      const el = els.cardList.querySelector(`.seq-card[data-id="${r.id}"]`);
      if (!el) return;
      el.classList.add(r.correct ? "correct" : "wrong");
      el.querySelector(".mark").textContent = r.correct ? "✓" : "✕";
      // Now that the answer is locked in, it's safe to reveal the
      // reference — it can no longer be used to game the ordering.
      el.querySelector(".card-ref").textContent =
        roundState.cardsById[r.id].reference;
    });

    els.btnLockIn.textContent =
      game.roundIndex === TOTAL_ROUNDS - 1
        ? `${score}/4 CORRECT — SEE RESULTS`
        : `${score}/4 CORRECT — NEXT ROUND`;
    els.btnLockIn.onclick = advanceRound;

    // Now that the round is scored, it's safe to reveal the full story
    // context — it can no longer be used to game the ordering.
    els.storyContextText.textContent = round.storyDescription || "";
    els.storyContext.hidden = !round.storyDescription;
  }

  function advanceRound() {
    game.roundIndex += 1;
    if (game.roundIndex >= TOTAL_ROUNDS) {
      els.progressFill.style.width = "100%";
      showResults();
    } else {
      renderRound();
    }
  }

  // ---------------------------------------------------------------
  // Results
  // ---------------------------------------------------------------
  function showResults() {
    const total = game.roundScores.reduce((a, b) => a + b, 0);
    const maxScore = TOTAL_ROUNDS * 4;
    const percent = Math.round((total / maxScore) * 100);
    const message = BibleSequenceEngine.scoreMessage(percent);
    const breakdown = game.rounds.map((round, i) => ({
      storyName: round.storyName,
      score: game.roundScores[i],
    }));

    const resultData = {
      playerId,
      dateKey,
      total,
      maxScore,
      percent,
      message,
      breakdown,
      completedAt: Date.now(),
    };
    saveTodayResult(resultData);

    renderResultsFromData(resultData, false);
    animateScoreCountUp(total, maxScore);
  }

  /** Renders the results screen from a saved/computed result object.
   *  Used both right after finishing a game and when returning later
   *  the same day to view an already-completed result. */
  function renderResultsFromData(data, alreadyPlayed) {
    showScreen("results");
    if (els.resultsEyebrow) {
      els.resultsEyebrow.textContent = alreadyPlayed
        ? "TODAY'S RESULT"
        : "YOUR FINAL SCORE";
    }
    els.finalScore.textContent = `${data.total}/${data.maxScore}`;
    els.finalPercent.textContent = `${data.percent}%`;
    els.finalMessage.textContent = data.message;

    els.roundBreakdown.innerHTML = "";
    data.breakdown.forEach((round, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="rb-story">Round ${i + 1} — ${round.storyName}</span>
        <span class="rb-score">${round.score}/4</span>
      `;
      els.roundBreakdown.appendChild(li);
    });

    els.btnPlayAgain.hidden = alreadyPlayed;
    // Keep the "official" game object in sync so Share reads real data
    // even when we jumped here from the start screen.
    game = game || { roundScores: data.breakdown.map((r) => r.score) };
  }

  function animateScoreCountUp(total, maxScore) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const duration = 500;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const shown = Math.round(t * total);
      els.finalScore.textContent = `${shown}/${maxScore}`;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---------------------------------------------------------------
  // Share
  // ---------------------------------------------------------------
  async function shareResult() {
    const stored = loadTodayResult();
    const total = stored ? stored.total : 0;
    const maxScore = stored ? stored.maxScore : TOTAL_ROUNDS * 4;
    const url = window.location.href.split("#")[0].split("?")[0];
    const text = `I scored ${total}/${maxScore} on today's Bible Sequence. Can you beat me?`;

    if (navigator.share) {
      try {
        await navigator.share({ text, url, title: "Bible Sequence" });
      } catch (err) {
        // user cancelled the share sheet — no action needed
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      showToast("Link copied!");
    } catch (err) {
      showToast("Copy this link: " + url);
    }
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      els.toast.hidden = true;
    }, 2200);
  }

  // ---------------------------------------------------------------
  // Wire up
  // ---------------------------------------------------------------
  els.btnShare.addEventListener("click", shareResult);
  els.btnPlayAgain.addEventListener("click", () => {
    // "Play again" only ever appears right after finishing — it replays
    // today's same puzzle for review, it does not grant a second
    // official score (see startGame()).
    game = { rounds: todaysRounds, roundIndex: 0, roundScores: [] };
    showScreen("round");
    renderRound();
  });

  renderStartScreen();
})();
