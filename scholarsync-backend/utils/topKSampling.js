// utils/topKSampling.js
function topKSampling(probabilities, k) {
  // probabilities: { token: prob } where probs sum ~ 1.0

  // 1. Sort tokens by probability
  const sorted = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);

  // 2. Keep top k
  const topK = sorted.slice(0, k);

  // 3. Normalize
  const total = topK.reduce((acc, [_, prob]) => acc + prob, 0);
  const normalized = topK.map(([token, prob]) => [token, prob / total]);

  // 4. Sample
  const rand = Math.random();
  let cumulative = 0;
  for (const [token, prob] of normalized) {
    cumulative += prob;
    if (rand < cumulative) return token;
  }

  return normalized[normalized.length - 1][0]; // fallback
}

module.exports = topKSampling;
