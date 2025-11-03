// backend/routes/genAI.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// POST /api/genai/dynamic
router.post("/dynamic", async (req, res) => {
  const { studentName, branch, achievements } = req.body;

  // Dynamic prompt construction
  let basePrompt = `Extract and list the most relevant technical skills from the following student profile.`;

  if (branch === "CSE") {
    basePrompt += ` Focus more on programming, software, AI, and web technologies.`;
  } else if (branch === "Mechanical") {
    basePrompt += ` Focus more on CAD tools, manufacturing processes, and mechanical design.`;
  } else {
    basePrompt += ` Provide general academic and technical skills.`;
  }

  const finalPrompt = `
    Student Name: ${studentName}
    Branch: ${branch}
    Achievements: ${achievements}

    Task: ${basePrompt}
    Output only skills as a comma-separated list.
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: finalPrompt }],
        temperature: 0.5
      })
    });

    const data = await response.json();
    const skills = data.choices[0].message.content;

    res.json({ skills, usedPrompt: finalPrompt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
