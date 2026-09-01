const { STORIES } = require("./data.js");
const engine = require("./engine.js");

let failures = 0;
function assert(cond, msg) {
  if (!cond) {
    failures++;
    console.error("FAIL:", msg);
  } else {
    console.log("ok:", msg);
  }
}

// --- Dataset sanity -------------------------------------------------
assert(STORIES.length >= 100, `dataset has >=100 stories (has ${STORIES.length})`);
const keys = new Set(STORIES.map((s) => s.key));
assert(keys.size === STORIES.length, "all story keys are unique");
assert(
  STORIES.every((s) => s.events.length === 4),
  "every story has exactly 4 events"
);
assert(
  STORIES.every((s) => {
    const seqs = s.events.map((e) => e.sequence).sort();
    return JSON.stringify(seqs) === JSON.stringify([1, 2, 3, 4]);
  }),
  "every story's events are sequenced 1-4 with no gaps or dupes"
);
assert(
  STORIES.every((s) => s.category === "OLD_TESTAMENT" || s.category === "NEW_TESTAMENT"),
  "every story has a valid category"
);
assert(
  STORIES.every((s) => [1, 2, 3].includes(s.difficulty)),
  "every story has a valid difficulty (1-3)"
);
assert(
  STORIES.every((s) => typeof s.description === "string" && s.description.length > 20),
  "every story has a real description"
);
assert(
  STORIES.every((s) => s.events.every((e) => e.reference && e.reference.length > 0)),
  "every event has a scripture reference"
);
const allEventIds = STORIES.flatMap((s) => s.events.map((e) => e.id));
assert(
  new Set(allEventIds).size === allEventIds.length,
  "every event id is globally unique"
);

const otCount = STORIES.filter((s) => s.category === "OLD_TESTAMENT").length;
const ntCount = STORIES.filter((s) => s.category === "NEW_TESTAMENT").length;
console.log(`  ${STORIES.length} stories total (${otCount} OT, ${ntCount} NT)`);

// --- buildRound -------------------------------------------------------
for (const s of STORIES.slice(0, 5)) {
  const round = engine.buildRound(s);
  assert(round.cards.length === 4, `${s.key}: round has 4 cards`);
  assert(round.correctOrderIds.length === 4, `${s.key}: correct order has 4 ids`);
  const cardIds = round.cards.map((c) => c.id).sort();
  const correctIds = round.correctOrderIds.slice().sort();
  assert(
    JSON.stringify(cardIds) === JSON.stringify(correctIds),
    `${s.key}: displayed cards are the same set as the correct order`
  );
  assert(round.cards.every((c) => c.reference), `${s.key}: cards carry their reference for post-lock reveal`);
  assert(typeof round.storyDescription === "string", `${s.key}: round carries story description`);
}

// --- generateGame (unseeded) ------------------------------------------
for (let trial = 0; trial < 30; trial++) {
  const rounds = engine.generateGame();
  assert(rounds.length === 5, "generateGame() returns 5 rounds");
  const storiesUsed = rounds.map((r) => r.storyKey);
  assert(new Set(storiesUsed).size === 5, `trial ${trial}: 5 distinct stories in one game`);
  const subcats = rounds.map((r) => r.subcategory);
  // Not a hard guarantee (fallback pass can repeat if pool is thin), but
  // with 100+ stories across dozens of subcategories this should hold.
  if (new Set(subcats).size !== 5) {
    console.log(`  (trial ${trial}: subcategories repeated — ${subcats.join(", ")})`);
  }
}

// --- daily seed determinism ------------------------------------------
const seedA1 = engine.generateGame("2026-08-31");
const seedA2 = engine.generateGame("2026-08-31");
assert(
  JSON.stringify(seedA1) === JSON.stringify(seedA2),
  "generateGame with the same seed produces an identical game both times"
);

const seedB = engine.generateGame("2026-09-01");
assert(
  JSON.stringify(seedA1) !== JSON.stringify(seedB),
  "generateGame with a different seed produces a different game"
);

const todayKey = engine.todaySeedKey(new Date(2026, 7, 31)); // Aug 31 2026 (local)
assert(todayKey === "2026-08-31", `todaySeedKey formats as YYYY-MM-DD (got ${todayKey})`);

// --- checkAnswer: full correct, full wrong, partial ------------------
const sampleRound = engine.buildRound(STORIES[0]);

const perfect = engine.checkAnswer(sampleRound, sampleRound.correctOrderIds);
assert(perfect.score === 4, "checkAnswer: fully correct order scores 4/4");
assert(perfect.results.every((r) => r.correct), "checkAnswer: all positions marked correct");

const ids4 = sampleRound.correctOrderIds;
const swapped = [ids4[1], ids4[0], ids4[2], ids4[3]];
const swappedResult = engine.checkAnswer(sampleRound, swapped);
assert(swappedResult.score === 2, `checkAnswer: swapping positions 0/1 leaves 2 correct (got ${swappedResult.score})`);

// --- score message thresholds ---------------------------------------
assert(engine.scoreMessage(100).includes("PERFECT"), "scoreMessage: 100 -> perfect");
assert(engine.scoreMessage(85) === "STRONG RUN.", "scoreMessage: 85 -> strong run");
assert(engine.scoreMessage(65) === "SOLID EFFORT.", "scoreMessage: 65 -> solid effort");
assert(engine.scoreMessage(40).includes("GOOD START"), "scoreMessage: 40 -> good start");

// --- full 5-round game simulation, sum of rounds = final score -------
for (let trial = 0; trial < 20; trial++) {
  const rounds = engine.generateGame();
  let total = 0;
  const perRound = [];
  for (const round of rounds) {
    const guess =
      Math.random() < 0.5
        ? round.correctOrderIds
        : engine.shuffle(round.correctOrderIds);
    const result = engine.checkAnswer(round, guess);
    perRound.push(result.score);
    total += result.score;
  }
  const sum = perRound.reduce((a, b) => a + b, 0);
  assert(sum === total, `trial ${trial}: final score (${total}) equals sum of round scores (${sum})`);
  assert(total >= 0 && total <= 20, `trial ${trial}: final score in range 0-20 (got ${total})`);
}

console.log("\n" + (failures === 0 ? "ALL TESTS PASSED" : `${failures} TEST(S) FAILED`));
process.exit(failures === 0 ? 0 : 1);
