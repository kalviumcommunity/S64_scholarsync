import { useState } from "react";

function SkillExtractor() {
  const [skill, setSkill] = useState("");

  const fetchSkill = async (method) => {
    const endpoint =
      method === "top-k" ? "extract-skills-top-k" : "extract-skills-top-p";
    const body =
      method === "top-k"
        ? { k: 3, temperature: 0.7 }
        : { p: 0.9, temperature: 1.2 };

    const res = await fetch(`http://localhost:5000/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setSkill(`${data.method}: ${data.skill}`);
  };

  return (
    <div className="p-4 space-x-4">
      <button
        onClick={() => fetchSkill("top-k")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Extract Skill (Top-k + Temp)
      </button>
      <button
        onClick={() => fetchSkill("top-p")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Extract Skill (Top-p + Temp)
      </button>
      {skill && <p className="mt-2">✅ Selected Skill: {skill}</p>}
    </div>
  );
}

export default SkillExtractor;
