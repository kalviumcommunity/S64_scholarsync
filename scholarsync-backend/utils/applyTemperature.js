// utils/applyTemperature.js
function applyTemperature(probabilities, temperature) {
  if (temperature <= 0) throw new Error("Temperature must be > 0");

  // Apply scaling
  const scaled = Object.entries(probabilities).map(([token, prob]) => [
    token,
    Math.pow(prob, 1 / temperature),
  ]);

  // Normalize
  const total = scaled.reduce((acc, [_, val]) => acc + val, 0);
  const normalized = scaled.map(([token, val]) => [token, val / total]);

  // Convert back to object
  return Object.fromEntries(normalized);
}

module.exports = applyTemperature;
