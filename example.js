import React, { useState } from "react";
import { Input, Button } from "@/components/ui/button";

const GitPRDiff = () => {
  const [repo, setRepo] = useState("");
  const [owner, setOwner] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [diff, setDiff] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDiff = async () => {
    if (!repo || !owner || !prNumber) return alert("Please enter all fields");
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
        {
          headers: { Authorization: `Bearer YOUR_GITHUB_TOKEN` },
        }
      );
      const data = await response.json();
      if (data.diff_url) {
        const diffResponse = await fetch(data.diff_url);
        const diffText = await diffResponse.text();
        setDiff(diffText);
      } else {
        setDiff("No diff available");
      }
    } catch (error) {
      console.error("Error fetching PR diff:", error);
      setDiff("Failed to fetch PR diff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">Fetch GitHub PR Diff</h2>
      <Input placeholder="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} className="mb-2" />
      <Input placeholder="Repo" value={repo} onChange={(e) => setRepo(e.target.value)} className="mb-2" />
      <Input placeholder="PR Number" value={prNumber} onChange={(e) => setPrNumber(e.target.value)} className="mb-2" />
      <Button onClick={fetchDiff} disabled={loading}>{loading ? "Loading..." : "Fetch Diff"}</Button>
      {diff && <pre className="mt-4 p-2 border bg-gray-100 overflow-x-auto">{diff}</pre>}
    </div>
  );
};

export default GitPRDiff;
