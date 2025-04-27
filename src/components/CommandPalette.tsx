import React from "react";

interface CommandPaletteProps {
  onCommand: (cmd: string) => void;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onCommand, onClose }) => {
  const commands = [
    { label: "Bold", cmd: "bold" },
    { label: "Italic", cmd: "italic" },
    { label: "Underline", cmd: "underline" },
    { label: "Insert Dropdown", cmd: "insertDropdown" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-64 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Command Palette</h3>
        <ul className="space-y-2">
          {commands.map((item) => (
            <li key={item.cmd}>
              <button
                onClick={() => onCommand(item.cmd)}
                className="w-full text-left px-3 py-2 rounded hover:bg-blue-100"
              >
                {item.label}
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
