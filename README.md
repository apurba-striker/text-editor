
# Custom Rich Text Editor

This project is a fully custom-built Rich Text Editor created with **React**, featuring advanced functionality including:
- Text formatting (bold, italic, underline, headings)
- Nested list support with custom Tab/Shift+Tab indentation
- Custom block elements (quotes, code blocks, callouts)
- Inline interactive components like dropdowns and mentions
- Advanced keyboard shortcuts and command palette
- Robust clipboard handling for smart paste
- Undo/Redo system
- @mention system with fuzzy search and hover previews
- Drag and drop for inline elements (dropdowns)

---

## ✨ Features

### Core Editing
- **Bold, Italic, Underline** formatting
- **Headings** (H1, H2)
- **Quotes**, **Callouts**, and **Code Blocks** as special blocks
- **Nested Lists** with smart **Tab/Shift+Tab** behavior for indentation

### Inline Components
- **Dropdown menus** embedded directly inside text
- **@Mentions** with live fuzzy search
- Mentioned users are inserted as styled, non-editable inline spans

### Keyboard Shortcuts
- **Cmd+B / Ctrl+B**: Bold
- **Cmd+I / Ctrl+I**: Italic
- **Cmd+U / Ctrl+U**: Underline

- **/**: Open Command Palette
- **@**: Open Mention List

### Clipboard Support
- **Smart Paste** from external sources preserving HTML formatting
- **Plain Text Paste** fallback

### Undo/Redo
- Built-in Undo/Redo system using `execCommand`
- Saves content automatically to **localStorage**



---

## 🛠 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/apurba-striker/text-editor.git
cd text-editor
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` (or similar port).

---

## 🗂️ Project Structure

```
src/
 ├── components/
 │    ├── TextEditor.tsx       # Main Editor component
 │    ├── Toolbar.tsx           # Editor toolbar
 │    ├── CommandPalette.tsx    # Slash command modal
 │    ├── MentionList.tsx       # @Mention search popup
 ├── hooks/
 │    ├── useEditorState.ts     # Editor content and formatting logic
 │    ├── useKeyboardShortcuts.ts # Keyboard shortcut handler
 ├── App.tsx
 ├── main.tsx
 └── index.css
```

---

## 📦 Built With

- [React 18+](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fuse.js](https://fusejs.io/) (for fuzzy searching mentions)
- [Tailwind CSS](https://tailwindcss.com/) (for fast styling)

---



## 📜 License

[MIT License](LICENSE)
