import { useCallback, useEffect, useRef } from "react";

export const useEditorState = (editorRef: any) => {
  const LOCAL_STORAGE_KEY = "editor-content";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveContent = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (editorRef.current) {
        localStorage.setItem(LOCAL_STORAGE_KEY, editorRef.current.innerHTML);
      }
    }, 300);
  }, [editorRef]);

  const loadContent = useCallback(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (editorRef.current && saved) {
      editorRef.current.innerHTML = saved;
    }
  }, [editorRef]);

  const applyFormat = useCallback((format: string) => {
    if (!editorRef.current) return;
    const editor = editorRef.current;
    editor.focus();

    switch (format) {
      case "bold":
        document.execCommand("bold");
        break;
      case "italic":
        document.execCommand("italic");
        break;
      case "underline":
        document.execCommand("underline");
        break;
      case "formatBlock_h1":
        document.execCommand("formatBlock", false, "h1");
        break;
      case "formatBlock_h2":
        document.execCommand("formatBlock", false, "h2");
        break;
      case "insertUnorderedList":
        document.execCommand("insertUnorderedList");
        break;
      case "insertOrderedList":
        document.execCommand("insertOrderedList");
        break;
      case "quote":
        document.execCommand("formatBlock", false, "blockquote");
        break;
      case "codeBlock": {
        const pre = document.createElement("pre");
        pre.textContent = window.getSelection()?.toString() || "";
        const range = window.getSelection()?.getRangeAt(0);
        if (range) {
          range.deleteContents();
          range.insertNode(pre);
        }
        break;
      }
      case "callout": {
        const div = document.createElement("div");
        div.className = "p-2 border-l-4 border-blue-400 bg-blue-50";
        div.textContent = window.getSelection()?.toString() || "Callout text here...";
        const range = window.getSelection()?.getRangeAt(0);
        if (range) {
          range.deleteContents();
          range.insertNode(div);
        }
        break;
      }
      default:
        break;
    }
    saveContent();
  }, [editorRef, saveContent]);

  const insertMention = useCallback((mention: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const node = range.startContainer;

    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as Text;
      const text = textNode.textContent || "";
      const atIndex = text.lastIndexOf("@", range.startOffset - 1);

      if (atIndex !== -1) {
        const beforeAt = text.substring(0, atIndex);
        const afterAt = text.substring(range.startOffset);

        // Replace current text
        const beforeNode = document.createTextNode(beforeAt);
        const afterNode = document.createTextNode(afterAt);

        const mentionSpan = document.createElement("span");
        mentionSpan.className = "bg-blue-100 px-1 rounded text-blue-700 cursor-pointer hover:bg-blue-200 transition";
        mentionSpan.contentEditable = "false";
        mentionSpan.innerText = `@${mention}`;
        mentionSpan.title = `Mention: ${mention}`;

        const parent = textNode.parentNode;
        if (parent) {
          parent.replaceChild(afterNode, textNode);
          parent.insertBefore(mentionSpan, afterNode);
          parent.insertBefore(beforeNode, mentionSpan);

          const space = document.createTextNode("\u00A0");
          parent.insertBefore(space, afterNode);

          // Move cursor after space
          const newRange = document.createRange();
          newRange.setStartAfter(space);
          newRange.collapse(true);

          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
    }
    saveContent();
  }, [editorRef, saveContent]);

  const undo = useCallback(() => {
    document.execCommand("undo");
    saveContent();
  }, [saveContent]);

  const redo = useCallback(() => {
    document.execCommand("redo");
    saveContent();
  }, [saveContent]);

  // Auto-save on typing
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handler = () => saveContent();
    editor.addEventListener("input", handler);

    return () => {
      editor.removeEventListener("input", handler);
    };
  }, [editorRef, saveContent]);

  return {
    applyFormat,
    insertMention,
    undo,
    redo,
    saveContent,
    loadContent,
  };
};
