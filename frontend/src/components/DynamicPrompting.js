// frontend/src/components/DynamicPrompting.js
import { useState } from "react";

export default function DynamicPrompting() {
  const [studentName, setStudentName] = useState("");
  const [branch, setBranch] = useState("");
  const [achievements, setAchievements] = useState("");
  const [skills, setSkills] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/genai/dynamic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentName, branch, achievements }),
    });
    const data = await res.json();
    setSkills(data.skills);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Dynamic Prompting - ScholarSync</h2>

      <input
        type="text"
        placeholder="Student Name"
        className="border p-2 w-full mb-2"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Branch (CSE, Mechanical, etc.)"
        className="border p-2 w-full mb-2"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />
      <textarea
        placeholder="Achievements"
        className="border p-2 w-full mb-2"
        value={achievements}
        onChange={(e) => setAchievements(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Skills
      </button>

      {skills && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h3 className="font-semibold">Extracted Skills:</h3>
          <p>{skills}</p>
        </div>
      )}
    </div>
  );
}
