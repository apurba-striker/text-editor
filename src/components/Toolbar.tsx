// src/components/Toolbar.tsx
import React from "react";

interface ToolbarProps {
  applyFormat: (command: string) => void;
  undo: () => void;
  redo: () => void;
  insertDropdown: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ applyFormat, undo, redo, insertDropdown }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Formatting buttons */}
      <button onClick={() => applyFormat("bold")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm">Bold</button>
      <button onClick={() => applyFormat("italic")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Italic</button>
      <button onClick={() => applyFormat("underline")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Underline</button>
      <button onClick={() => applyFormat("formatBlock_h1")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">H1</button>
      <button onClick={() => applyFormat("formatBlock_h2")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">H2</button>
      <button onClick={() => applyFormat("insertUnorderedList")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Bullet List</button>
      <button onClick={() => applyFormat("insertOrderedList")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Numbered List</button>
      <button onClick={() => applyFormat("quote")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Quote</button>
      <button onClick={() => applyFormat("codeBlock")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Code Block</button>
      <button onClick={() => applyFormat("callout")} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Callout</button>
      <button onClick={undo} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Undo</button>
      <button onClick={redo} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Redo</button>
      <button onClick={insertDropdown} className="px-2 py-1 rounded bg-gray-200 hover:bg-blue-300 text-sm;">Insert Dropdown</button>
    </div>
  );
};
