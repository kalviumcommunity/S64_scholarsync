import { useState } from "react";

export default function CoTSkillExtractor() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function run(n = 1) {
    setLoading(true);
    setResult(null);
    const res = await fetch("http://localhost:5000/extract-skills-cot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileText: text,
        canonicalSkills: ["React", "Node.js", "MongoDB", "Express", "SQL", "Docker", "Python", "TensorFlow"],
        n,                // try n=3 for self-consistency
        temperature: 0.7,
        top_p: 0.9
      })
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div className="p-4 space-y-3">
      <textarea
        className="w-full border rounded p-2"
        placeholder="Paste profile text…"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="flex gap-2">
        <button onClick={() => run(1)} className="px-4 py-2 rounded bg-blue-600 text-white">
          Extract (CoT)
        </button>
        <button onClick={() => run(3)} className="px-4 py-2 rounded bg-green-600 text-white">
          Extract + Self-Consistency (n=3)
        </button>
      </div>
      {loading && <p>Thinking…</p>}
      {result && (
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
