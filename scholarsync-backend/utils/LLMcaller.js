// utils/llmClient.js
/**
 * Minimal, vendor-agnostic LLM caller using fetch.
 * Wire it to OpenAI / OpenRouter / Gemini / local LLM as you prefer.
 */
const MODEL_BASE_URL = process.env.LLM_BASE_URL || "https://api.openai.com/v1/chat/completions";
const MODEL_NAME = process.env.LLM_MODEL || "gpt-4o-mini";
const API_KEY = process.env.LLM_API_KEY;

async function callLLMJSON(messages, { temperature = 0.7, top_p = 0.9 } = {}) {
  const res = await fetch(MODEL_BASE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages,
      temperature,
      top_p,
      // Many providers support strict JSON mode; if yours does, keep this:
      response_format: { type: "json_object" }
    })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`LLM error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  const content =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.message ??
    data?.content;

  // Ensure we return a JSON object
  try {
    return JSON.parse(content);
  } catch {
    // Fallback: try to extract a JSON block if provider ignored json mode
    const match = String(content).match(/\{[\s\S]*\}$/);
    if (!match) throw new Error("LLM did not return JSON.");
    return JSON.parse(match[0]);
  }
}

module.exports = { callLLMJSON };
