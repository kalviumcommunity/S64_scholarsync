// routes/extractSkillsStop.js
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/extract-skills-stop", async (req, res) => {
  const { profileText } = req.body;

  const prompt = `
Extract the technical skills from this student profile in JSON array format.
Profile: "${profileText}"
Skills:
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 150,
        stop: ["\n\n", "END"]   // <-- stop sequences
      })
    });

    const data = await response.json();
    res.json({ skills: data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
