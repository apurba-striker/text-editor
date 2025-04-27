import React, { useCallback, useEffect, useRef, useState } from "react";
import { Toolbar } from "./Toolbar";
import { useEditorState } from "../hooks/useEditorState";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { CommandPalette } from "./CommandPalette";
import { MentionList } from "./MentionList";

export const TextEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const {
    content,
    setContent,
    applyFormat,
    insertMention,
    insertDropdown,
    undo,
    redo,
    saveContent,
    loadContent,
  } = useEditorState(editorRef);

  const { handleKeyDown } = useKeyboardShortcuts({ applyFormat, insertDropdown });

  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showMentionList, setShowMentionList] = useState(false);

  // Save content on input (debounced inside useEditorState)
  const handleInput = useCallback(() => {
    saveContent();
  }, [saveContent]);

  // Smart paste handler (preserve HTML if available)
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");
    if (html) {
      document.execCommand("insertHTML", false, html);
    } else {
      document.execCommand("insertText", false, text);
    }
    saveContent();
  };

  // Handle key commands + / and @ triggers
  const handleKeyDownExtended = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      setShowCommandPalette(true);
    }
    if (e.key === "@") {
      setShowMentionList(true);
    }
    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand(e.shiftKey ? "outdent" : "indent");
    }
    handleKeyDown(e);
};


  // Drag and Drop Support (for dropdowns)
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === "SELECT") {
      e.dataTransfer.setData("text/plain", "dropdown");
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Needed to allow drop
  };
  

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
    if (range) {
      range.insertNode(document.createTextNode(data));
    }
  
    if (data === "dropdown") {
      const select = document.createElement("select");
      select.className = "inline-block border rounded px-2 py-1 text-sm bg-white text-gray-700";
      select.appendChild(new Option("Option 1", "1"));
      select.appendChild(new Option("Option 2", "2"));
      const range = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (range) {
        range.insertNode(select);
      }
      saveContent();
    }
  };

  // Initial load from localStorage
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      {/* Toolbar */}
      <Toolbar applyFormat={applyFormat} undo={undo} redo={redo} insertDropdown={insertDropdown} />

      {/* Editor */}
      <div
  ref={editorRef}
  contentEditable
  suppressContentEditableWarning
  className="min-h-[300px] p-4 border mt-4 focus:outline-none rounded focus:ring-2 focus:ring-blue-400"
  onInput={handleInput}
  onPaste={handlePaste}
  onKeyDown={handleKeyDownExtended}
  onDragStart={handleDragStart}
  onDragOver={handleDragOver}
  onDrop={handleDrop}
  aria-label="Rich Text Editor"
  role="textbox"
>
</div>


      {/* Command Palette */}
      {showCommandPalette && (
        <CommandPalette
          onCommand={(cmd) => {
            applyFormat(cmd);
            setShowCommandPalette(false);
          }}
          onClose={() => setShowCommandPalette(false)}
        />
      )}

      {/* Mention List */}
      {showMentionList && (
        <MentionList
          onMention={(mention) => {
            insertMention(mention);
            setShowMentionList(false);
          }}
          onClose={() => setShowMentionList(false)}
        />
      )}
      
    </div>
  );
};
export default TextEditor;
