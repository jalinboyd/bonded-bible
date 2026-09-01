// Server-side mirror of the seeded shuffle/selection logic in engine.js.
// Kept as a small standalone copy (rather than importing the frontend
// file) because it operates on Supabase rows instead of the in-memory
// STORIES array, and serverless functions bundle their own dependencies.
//
// IMPORTANT: the shuffle/seed math here must stay byte-for-byte
// identical to engine.js's mulberry32/hashSeed/shuffle. If you change
// one, change the other — otherwise the server's answer key and the
// client's locally-computed "preview" of today's puzzle could diverge.

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

function hashSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h ^ (h >>> 16)) >>> 0;
}

function shuffle(array, rng) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const ROUNDS_PER_GAME = 5;

/** stories: array of { id, subcategory, difficulty, events: [...] } from Supabase. */
function pickDailyStories(stories, rng) {
  const shuffled = shuffle(stories, rng);
  const picked = [];
  const usedSubcategories = new Set();

  for (const story of shuffled) {
    if (picked.length >= ROUNDS_PER_GAME) break;
    if (!usedSubcategories.has(story.subcategory)) {
      picked.push(story);
      usedSubcategories.add(story.subcategory);
    }
  }
  for (const story of shuffled) {
    if (picked.length >= ROUNDS_PER_GAME) break;
    if (!picked.includes(story)) picked.push(story);
  }

  return picked.sort((a, b) => {
    const rank = (s) => (s.difficulty === 2 ? 0 : s.difficulty === 1 ? 1 : 2);
    return rank(a) - rank(b) || rng() - 0.5;
  });
}

/** Returns { storyId, events: [{ eventId, displayPosition, correctSequence }] } per round. */
function buildDailyRounds(stories, dateKey) {
  const rng = mulberry32(hashSeed(dateKey));
  const dailyStories = pickDailyStories(stories, rng);

  return dailyStories.map((story) => {
    const correctOrder = story.events.slice().sort((a, b) => a.sequence - b.sequence);
    let display = shuffle(correctOrder, rng);
    let attempts = 0;
    while (
      attempts < 10 &&
      display.every((e, i) => e.id === correctOrder[i].id)
    ) {
      display = shuffle(correctOrder, rng);
      attempts++;
    }
    return {
      storyId: story.id,
      events: display.map((e, i) => ({
        eventId: e.id,
        displayPosition: i + 1,
        correctSequence: e.sequence,
      })),
    };
  });
}

module.exports = { buildDailyRounds, mulberry32, hashSeed, shuffle, ROUNDS_PER_GAME };
