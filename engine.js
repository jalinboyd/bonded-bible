/**
 * Bible Sequence — game engine
 * -----------------------------------------------------------------------
 * Pure logic, no DOM access. Reads STORIES from data.js and builds each
 * day's 5-round challenge from it — nothing is hand-written per day.
 *
 *   DATA  →  DAILY SELECTION  →  GAME ROUND
 *
 * The daily challenge is deterministic: every player who opens the game
 * on the same calendar date gets the exact same 5 stories in the exact
 * same order, so scores are directly comparable. This works without any
 * backend — see checkAnswer() below for what a real backend would
 * additionally verify server-side (see /backend).
 */

(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    // Node (used by test-engine.js)
    const { STORIES } = require("./data.js");
    module.exports = factory(STORIES);
  } else {
    // Browser — data.js must be loaded first as a <script>
    root.BibleSequenceEngine = factory(root.STORIES);
  }
})(typeof self !== "undefined" ? self : this, function (STORIES) {
  const ROUNDS_PER_GAME = 5;

  /**
   * Deterministic PRNG (mulberry32) — same seed always produces the same
   * sequence of numbers. This is what makes "today's challenge" the same
   * for every player: everyone's browser derives it from the same date.
   */
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Turn any string into a 32-bit integer seed. */
  function hashSeed(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return (h ^ (h >>> 16)) >>> 0;
  }

  /** Today's date as YYYY-MM-DD in the player's local timezone. */
  function todaySeedKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  /** Fisher-Yates shuffle. Returns a new array; does not mutate input.
   *  Pass a seeded `rng` (0-1 generator) for deterministic shuffles. */
  function shuffle(array, rng = Math.random) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  /**
   * Pick ROUNDS_PER_GAME stories for one day's challenge, trying to:
   *  - never repeat a story
   *  - avoid picking two stories from the same subcategory (e.g. two
   *    "David" stories) when a different option is available
   *  - mix difficulty levels rather than all-easy or all-hard
   * This mirrors what a hand-curated daily challenge would look like,
   * without anyone having to curate it.
   */
  function pickDailyStories(rng) {
    const shuffled = shuffle(STORIES, rng);
    const picked = [];
    const usedSubcategories = new Set();

    // Pass 1: greedily take stories with a fresh subcategory.
    for (const story of shuffled) {
      if (picked.length >= ROUNDS_PER_GAME) break;
      if (!usedSubcategories.has(story.subcategory)) {
        picked.push(story);
        usedSubcategories.add(story.subcategory);
      }
    }
    // Pass 2 (fallback): fill any remaining slots from whatever's left,
    // in case the pool doesn't have enough distinct subcategories.
    for (const story of shuffled) {
      if (picked.length >= ROUNDS_PER_GAME) break;
      if (!picked.includes(story)) picked.push(story);
    }

    // Order the picked stories so difficulty isn't front- or back-loaded
    // (roughly alternate rather than all-easy-then-all-hard).
    return picked.sort((a, b) => {
      const rank = (s) => (s.difficulty === 2 ? 0 : s.difficulty === 1 ? 1 : 2);
      return rank(a) - rank(b) || rng() - 0.5;
    });
  }

  /**
   * Build a single round from a story: its 4 events, in a shuffled
   * display order (re-shuffled if it happens to already be the correct
   * order, so every round is an actual puzzle).
   */
  function buildRound(story, rng = Math.random) {
    const correctOrder = story.events.slice().sort((a, b) => a.sequence - b.sequence);
    const correctOrderIds = correctOrder.map((e) => e.id);

    let display = shuffle(correctOrder, rng);
    let attempts = 0;
    while (
      attempts < 10 &&
      display.every((e, i) => e.id === correctOrderIds[i])
    ) {
      display = shuffle(correctOrder, rng);
      attempts++;
    }

    return {
      storyKey: story.key,
      storyName: story.name,
      storyDescription: story.description,
      category: story.category,
      subcategory: story.subcategory,
      difficulty: story.difficulty,
      correctOrderIds,
      cards: display.map((e) => ({
        id: e.id,
        title: e.text,
        reference: e.reference,
      })),
    };
  }

  /**
   * Generate a full game: ROUNDS_PER_GAME rounds.
   *
   * `seed`, if given (e.g. a date key like "2026-08-31"), makes the whole
   * game deterministic — the same seed always produces the same rounds
   * in the same order, so everyone playing that day gets an identical
   * challenge. Omit it for a fully random game (used by tests).
   */
  function generateGame(seed = null) {
    const rng = seed === null ? Math.random : mulberry32(hashSeed(seed));
    const dailyStories = pickDailyStories(rng);
    return dailyStories.map((story) => buildRound(story, rng));
  }

  /**
   * Compare a player's submitted order (array of event ids) against the
   * round's correct order. Returns per-position correctness plus a score.
   *
   * NOTE ON SECURITY: this runs in the player's browser, so a
   * technically-minded player could edit the JavaScript and fake a
   * score. That's fine for a friendly group-chat game with no prizes,
   * but if you want a tamper-proof leaderboard, the /backend functions
   * re-run this exact check server-side against the same seeded data —
   * see /backend/README.md.
   */
  function checkAnswer(round, playerOrderIds) {
    if (
      !Array.isArray(playerOrderIds) ||
      playerOrderIds.length !== round.correctOrderIds.length
    ) {
      throw new Error("playerOrderIds must match the round length.");
    }
    const results = playerOrderIds.map((id, i) => ({
      id,
      correct: id === round.correctOrderIds[i],
    }));
    const score = results.filter((r) => r.correct).length;
    return { results, score, maxScore: round.correctOrderIds.length };
  }

  function scoreMessage(percent) {
    if (percent === 100) return "PERFECT. YOU KNOW THESE STORIES.";
    if (percent >= 80) return "STRONG RUN.";
    if (percent >= 60) return "SOLID EFFORT.";
    return "GOOD START. RUN IT BACK.";
  }

  return {
    ROUNDS_PER_GAME,
    shuffle,
    todaySeedKey,
    mulberry32,
    hashSeed,
    pickDailyStories,
    buildRound,
    generateGame,
    checkAnswer,
    scoreMessage,
  };
});
