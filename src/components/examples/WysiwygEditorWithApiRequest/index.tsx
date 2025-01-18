
import React from "react";
import "./styles.css";
import { useFakeApi } from "./useFakeApi";
import WysiwygEditor from "../../WysiwygEditor";

/**
 * A demonstration of the WysiwygEditor component with a fake API request hook.
 *
 * This component uses the useFakeApi hook to simulate a real API request. It displays a
 * WysiwygEditor component with a "Send Content" button. When the button is clicked, the
 * component enters a "loading" state and the fake API request is sent. After the request
 * is complete, the component displays a success message.
 *
 * @returns A React component with a WysiwygEditor and a "Send Content" button.
 */
const WysiwygEditorWithApiRequest: React.FC = () => {
  const { editorState, handleEditorChange, sendContent, loading, sending } = useFakeApi();

  return (
    <div className="wysiwyg-editor-container">
       <WysiwygEditor value={editorState} onChange={handleEditorChange} isLoading={loading}/>
      <button onClick={sendContent} disabled={sending || loading}>{sending ? "Sending..." : "Send Content"}</button>
    </div>
  );
};

export default WysiwygEditorWithApiRequest;
