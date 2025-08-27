// utils/cotPrompt.js
/**
 * Build a CoT-safe prompt: the model may reason internally but must only return JSON.
 */
function buildCotPrompt(profileText, canonicalSkills = []) {
  const canonicalSection = canonicalSkills.length
    ? `Use this canonical skill list to normalize names where possible:
${canonicalSkills.map(s => `- ${s}`).join("\n")}

If a skill is not in the list but is clearly technical, include it as-is.`
    : `Normalize common variants (e.g., "js" -> "JavaScript", "tf" -> "TensorFlow").`;

  return `
You are an expert resume parser for student profiles.

Goal:
- Extract only **technical skills** from the given profile text.
- Return a strict JSON object following the schema below.
- Think through the mapping and disambiguation internally on a private scratchpad.
- Do **NOT** reveal your reasoning steps, chain-of-thought, or intermediate notes.
- Output only the final JSON, nothing else.

${canonicalSection}

Schema (JSON):
{
  "skills": string[],               // canonical technical skills
  "supporting_phrases": string[],   // short exact quotes from the text that justify each skill
  "confidence": number              // 0.0 to 1.0
}

Now parse the following student profile:

PROFILE_TEXT:
"""
${profileText}
"""

Remember:
- Use a private scratchpad for reasoning.
- Do not include the scratchpad in the output.
- Output only valid minified JSON matching the schema.
`.trim();
}

module.exports = { buildCotPrompt };
