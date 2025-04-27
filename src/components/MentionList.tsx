import React from "react";

interface MentionListProps {
  onMention: (mention: string) => void;
  onClose: () => void;
}

export const MentionList: React.FC<MentionListProps> = ({ onMention, onClose }) => {
  const mentions = ["@Apurba", "@John", "@Jane", "@Support"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-64 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Mention Someone</h3>
        <ul className="space-y-2">
          {mentions.map((name) => (
            <li key={name}>
              <button
                onClick={() => onMention(name)}
                className="w-full text-left px-3 py-2 rounded hover:bg-green-100"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};
