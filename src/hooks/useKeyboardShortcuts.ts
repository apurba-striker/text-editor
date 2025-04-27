export const useKeyboardShortcuts = ({ applyFormat, insertDropdown }: any) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.metaKey && e.shiftKey && e.key === "8") {
        e.preventDefault();
        applyFormat("insertUnorderedList");
      }
      if (e.metaKey && e.shiftKey && e.key === "7") {
        e.preventDefault();
        applyFormat("insertOrderedList");
      }
    };
  
    return { handleKeyDown };
  };
  