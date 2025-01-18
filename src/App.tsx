import { useState } from "react";
import "./App.css";
import WysiwygEditor from "./components/WysiwygEditor";
import { EditorState } from "draft-js";
import WysiwygEditorWithApiRequest from "./components/examples/WysiwygEditorWithApiRequest";

function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="container">
      {/* --------- Controlled Mode ---------*/}
      <h1>1- Controlled Mode</h1>
      <WysiwygEditor value={editorState} onChange={setEditorState} />
      {/* --------- Uncontrolled Mode --------- */}
      <h1>2- Uncontrolled Mode</h1>
      <WysiwygEditor />
      {/* --------- basic customization using a className and optional style prop ---------*/}
      <h1>3- With inline and overwrite class Props</h1>
      <WysiwygEditor
        style={{ minWidth: "80vw" }}
        className="style-overwrite-class"
      />
      {/* ---------  with Fake API ---------*/}
      <h1>3- with Fake API</h1>
      <WysiwygEditorWithApiRequest />
    </div>
  );
}

export default App;
