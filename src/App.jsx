import React from "react";
import TextEditor from "./components/TextEditor";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Custom Rich Text Editor</h1>
      <TextEditor />
    </div>
  );
}

export default App;
