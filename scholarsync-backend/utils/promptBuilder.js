// utils/promptBuilder.js
function buildOneShotPrompt(profileText) {
  return `
Instruction: Extract key technical skills from the profile text.

Example:
Profile: "I worked with React and Node.js"
Skills: ["React", "Node.js"]

Now extract from this:
Profile: "${profileText}"
Skills:
  `;
}

module.exports = buildOneShotPrompt;
