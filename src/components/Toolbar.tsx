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
      <button onClick={() => applyFormat("bold")} className="btn">Bold</button>
      <button onClick={() => applyFormat("italic")} className="btn">Italic</button>
      <button onClick={() => applyFormat("underline")} className="btn">Underline</button>
      <button onClick={() => applyFormat("formatBlock_h1")} className="btn">H1</button>
      <button onClick={() => applyFormat("formatBlock_h2")} className="btn">H2</button>
      <button onClick={() => applyFormat("insertUnorderedList")} className="btn">Bullet List</button>
      <button onClick={() => applyFormat("insertOrderedList")} className="btn">Numbered List</button>
      <button onClick={() => applyFormat("quote")} className="btn">Quote</button>
      <button onClick={() => applyFormat("codeBlock")} className="btn">Code Block</button>
      <button onClick={() => applyFormat("callout")} className="btn">Callout</button>
      <button onClick={undo} className="btn">Undo</button>
      <button onClick={redo} className="btn">Redo</button>
      <button onClick={insertDropdown} className="btn">Insert Dropdown</button>
    </div>
  );
};
