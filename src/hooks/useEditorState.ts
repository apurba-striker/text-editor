import { useState, useCallback } from "react";

export const useEditorState = (editorRef: any) => {
  const LOCAL_STORAGE_KEY = "editor-content";

  const [history, setHistory] = useState<{ html: string; selection: Range | null }[]>([]);
  const [redoStack, setRedoStack] = useState<{ html: string; selection: Range | null }[]>([]);

  let timeout: NodeJS.Timeout | null = null;

  const saveContent = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (editorRef.current) {
        localStorage.setItem(LOCAL_STORAGE_KEY, editorRef.current.innerHTML);
        saveSnapshot(); // Save history on typing
      }
    }, 300); 
  };

  const saveSnapshot = () => {
    if (!editorRef.current) return;
    const selection = window.getSelection()?.getRangeAt(0) || null;
    setHistory(prev => [...prev, { html: editorRef.current.innerHTML, selection }]);
    setRedoStack([]); // Clear redo after new edit
  };

  const loadContent = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (editorRef.current && saved) {
      editorRef.current.innerHTML = saved;
    }
  };

  const applyFormat = (format: string) => {
    if (!editorRef.current) return;
    const editor = editorRef.current;
    editor.focus();

    if (format === "bold") document.execCommand("bold");
    else if (format === "italic") document.execCommand("italic");
    else if (format === "underline") document.execCommand("underline");
    else if (format === "formatBlock_h1") document.execCommand("formatBlock", false, "h1");
    else if (format === "formatBlock_h2") document.execCommand("formatBlock", false, "h2");
    else if (format === "insertUnorderedList") document.execCommand("insertUnorderedList");
    else if (format === "insertOrderedList") document.execCommand("insertOrderedList");
    else if (format === "quote") document.execCommand("formatBlock", false, "blockquote");
    else if (format === "codeBlock") {
      const pre = document.createElement("pre");
      pre.textContent = window.getSelection()?.toString() || "";
      const range = window.getSelection()?.getRangeAt(0);
      if (range) {
        range.deleteContents();
        range.insertNode(pre);
      }
    }
    else if (format === "callout") {
      const div = document.createElement("div");
      div.className = "p-2 border-l-4 border-blue-400 bg-blue-50";
      div.textContent = window.getSelection()?.toString() || "Callout text here...";
      const range = window.getSelection()?.getRangeAt(0);
      if (range) {
        range.deleteContents();
        range.insertNode(div);
      }
    }
    saveSnapshot();
  };

  const insertDropdown = () => {
    if (!editorRef.current) return;
    const select = document.createElement("select");
    select.className = "border p-1 rounded";
    const option1 = new Option("Option 1", "1");
    const option2 = new Option("Option 2", "2");
    select.appendChild(option1);
    select.appendChild(option2);

    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      range.deleteContents();
      range.insertNode(select);
    }
    saveSnapshot();
  };

  const insertMention = (mention: string) => {
    if (!editorRef.current) return;
    const span = document.createElement("span");
    span.className = "bg-blue-100 px-1 rounded text-blue-700";
    span.contentEditable = "false";
    span.innerText = `@${mention}`;

    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      range.deleteContents();
      range.insertNode(span);
    }
    saveSnapshot();
  };

  const undo = () => {
    if (history.length === 0 || !editorRef.current) return;
    const last = history[history.length - 1];
    setRedoStack(prev => [...prev, { html: editorRef.current.innerHTML, selection: getSelectionRange() }]);
    setHistory(prev => prev.slice(0, prev.length - 1));
    editorRef.current.innerHTML = last.html;
    restoreSelection(last.selection);
  };

  const redo = () => {
    if (redoStack.length === 0 || !editorRef.current) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, prev.length - 1));
    setHistory(prev => [...prev, { html: editorRef.current.innerHTML, selection: getSelectionRange() }]);
    editorRef.current.innerHTML = next.html;
    restoreSelection(next.selection);
  };

  const getSelectionRange = () => {
    return window.getSelection()?.rangeCount ? window.getSelection()?.getRangeAt(0) : null;
  };

  const restoreSelection = (range: Range | null) => {
    if (!range) return;
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  return {
    applyFormat,
    insertDropdown,
    insertMention,
    undo,
    redo,
    saveContent,
    loadContent,
  };
};
