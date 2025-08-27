import { useState } from "react";

function SkillExtractor() {
  const [skill, setSkill] = useState("");

  const fetchSkill = async () => {
    const res = await fetch("http://localhost:5000/extract-skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ k: 3 }),
    });
    const data = await res.json();
    setSkill(data.skill);
  };

  return (
    <div className="p-4">
      <button onClick={fetchSkill} className="bg-blue-500 text-white px-4 py-2 rounded">
        Extract Skill
      </button>
      {skill && <p className="mt-2">✅ Selected Skill: {skill}</p>}
    </div>
  );
}

export default SkillExtractor;
