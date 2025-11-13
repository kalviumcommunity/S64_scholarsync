import { useState } from "react";

function OneShotSkillExtractor() {
  const [profileText, setProfileText] = useState("");
  const [skills, setSkills] = useState("");

  const extractSkills = async () => {
    const res = await fetch("http://localhost:5000/extract-skills-oneshot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileText }),
    });
    const data = await res.json();
    setSkills(data.output);
  };

  return (
    <div className="p-4">
      <textarea
        value={profileText}
        onChange={(e) => setProfileText(e.target.value)}
        placeholder="Paste student profile here..."
        className="border p-2 w-full rounded"
      />
      <button
        onClick={extractSkills}
        className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
      >
        Extract Skills (One-shot)
      </button>
      {skills && <p className="mt-3">✅ Extracted: {skills}</p>}
    </div>
  );
}

export default OneShotSkillExtractor;
