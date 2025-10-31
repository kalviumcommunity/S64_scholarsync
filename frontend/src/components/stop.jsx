import { useState } from "react";

export default function StopSequenceExtractor() {
  const [profileText, setProfileText] = useState("");
  const [skills, setSkills] = useState("");

  const extractSkills = async () => {
    const res = await fetch("http://localhost:5000/extract-skills-stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileText }),
    });
    const data = await res.json();
    setSkills(data.skills);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Paste profile text..."
        value={profileText}
        onChange={(e) => setProfileText(e.target.value)}
      />
      <button
        onClick={extractSkills}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Extract Skills
      </button>

      {skills && (
        <pre className="mt-4 bg-gray-100 p-3 rounded">
          {skills}
        </pre>
      )}
    </div>
  );
}
