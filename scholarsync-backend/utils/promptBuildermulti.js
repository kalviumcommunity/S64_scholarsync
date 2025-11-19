// utils/promptBuilder.js
function buildMultiShotPrompt(profileText) {
  return `
Instruction: Extract key technical skills from the profile text.
Output must always be a JSON array of skills.

Examples:

Profile: "I worked with React and Node.js"
Skills: ["React", "Node.js"]

Profile: "I am good at Python, SQL, and Docker"
Skills: ["Python", "SQL", "Docker"]

Profile: "Experienced in Java, MongoDB, and Firebase"
Skills: ["Java", "MongoDB", "Firebase"]

Now extract from this:
Profile: "${profileText}"
Skills:
  `;
}

module.exports = buildMultiShotPrompt;
