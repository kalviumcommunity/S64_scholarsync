// utils/topPSampling.js
function topPSampling(probabilities, p) {
  // probabilities: { token: prob } where probs sum to ~1.0

  // 1. Sort tokens by probability
  const sorted = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);

  // 2. Accumulate until cumulative >= p
  let cumulative = 0;
  const nucleus = [];
  for (const [token, prob] of sorted) {
    cumulative += prob;
    nucleus.push([token, prob]);
    if (cumulative >= p) break;
  }

  // 3. Normalize nucleus
  const total = nucleus.reduce((acc, [_, prob]) => acc + prob, 0);
  const normalized = nucleus.map(([token, prob]) => [token, prob / total]);

  // 4. Sample from nucleus
  const rand = Math.random();
  let cum = 0;
  for (const [token, prob] of normalized) {
    cum += prob;
    if (rand < cum) return token;
  }

  return normalized[normalized.length - 1][0]; // fallback
}

module.exports = topPSampling;
