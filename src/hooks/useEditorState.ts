import { useCallback, useState } from "react";

export const useEditorState = (editorRef: any) => {
  const LOCAL_STORAGE_KEY = "editor-content";

  let timeout: NodeJS.Timeout | null = null;

const saveContent = () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (editorRef.current) {
      localStorage.setItem(LOCAL_STORAGE_KEY, editorRef.current.innerHTML);
    }
  }, 300); // Batches keystrokes into 300ms groups
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
};

  const loadContent = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (editorRef.current && saved) {
      editorRef.current.innerHTML = saved;
    }
  };


  const insertDropdown = () => {
    const select = document.createElement("select");
    const option1 = new Option("Option 1", "1");
    const option2 = new Option("Option 2", "2");
    select.appendChild(option1);
    select.appendChild(option2);
    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      range.insertNode(select);
    }
    saveContent();
  };

  const insertMention = (mention: string) => {
    const span = document.createElement("span");
    span.className = "bg-blue-100 px-1 rounded text-blue-700";
    span.contentEditable = "false";
    span.innerText = `@${mention}`;
    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      range.insertNode(span);
    }
    saveContent();
  };

  const undo = () => {
    document.execCommand("undo");
    saveContent();
  };

  const redo = () => {
    document.execCommand("redo");
    saveContent();
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
