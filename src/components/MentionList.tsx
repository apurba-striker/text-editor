// src/components/MentionList.tsx
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

const mentionData = [
  { name: "Apurba Patra" },
  { name: "John Doe" },
  { name: "Jane Smith" },
  { name: "Alpha Bot" },
  { name: "Beta Tester" },
  // Add more users/entities as needed
];

interface MentionListProps {
  onMention: (mention: string) => void;
  onClose: () => void;
}

export const MentionList: React.FC<MentionListProps> = ({ onMention, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(mentionData);

  const fuse = new Fuse(mentionData, {
    keys: ["name"],
    threshold: 0.3, // lower threshold => stricter match
  });

  useEffect(() => {
    if (query.trim() === "") {
      setResults(mentionData);
    } else {
      const searchResults = fuse.search(query).map((res) => res.item);
      setResults(searchResults);
    }
  }, [query]);

  return (
    <div className="absolute mt-2 p-2 border rounded bg-white shadow-lg w-64 z-10">
      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search mention..."
        className="w-full p-2 mb-2 border rounded focus:outline-none"
      />
      <ul className="max-h-40 overflow-y-auto">
        {results.map((mention, index) => (
          <li
            key={index}
            className="p-2 hover:bg-blue-100 cursor-pointer rounded"
            onClick={() => {
              onMention(mention.name);
              onClose();
            }}
          >
            {mention.name}
          </li>
        ))}
        {results.length === 0 && (
          <li className="p-2 text-gray-500">No results found.</li>
        )}
      </ul>
    </div>
  );
};
