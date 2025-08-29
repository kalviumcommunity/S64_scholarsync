import { useState } from "react";

function SkillExtractorTopP() {
  const [skill, setSkill] = useState("");

  const fetchSkill = async () => {
    const res = await fetch("http://localhost:5000/extract-skills-top-p", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ p: 0.85 }), // keep top 85% mass
    });
    const data = await res.json();
    setSkill(data.skill);
  };

  return (
    <div className="p-4">
      <button onClick={fetchSkill} className="bg-green-500 text-white px-4 py-2 rounded">
        Extract Skill (Top-p)
      </button>
      {skill && <p className="mt-2">✅ Selected Skill: {skill}</p>}
    </div>
  );
}

export default SkillExtractorTopP;
