import { useState, useEffect, useCallback } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";

/**
 * Simulates a fetch of content from an API.
 * @returns a Promise that resolves to a string of content after a 2-second delay.
 */
const fakeFetchContent = (): Promise<string> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve("This is an async loaded content from a fake API!"),
      2000
    )
  );

/**
 * Simulates sending content to an API.
 * @param content the content to be sent
 * @returns a Promise that resolves after a 1-second delay
 */
const fakeSendContent = (content: string): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("🚀 Fake API received:", content);
      alert("🚀 Fake API received successfully!");
      resolve();
    }, 1000)
  );

/**
 * A custom hook that simulates fetching and sending content to a fake API.
 *
 * This hook manages the state for a WYSIWYG editor using `draft-js`. It 
 * initializes with content fetched from a fake API and provides functions 
 * to handle editor state changes and send content back to the fake API.
 *
 * @returns An object containing:
 *  - `editorState`: The current state of the editor.
 *  - `handleEditorChange`: A function to handle changes in the editor state.
 *  - `sendContent`: A function to send the current editor content to the fake API.
 *  - `loading`: A boolean indicating whether the initial content is being loaded.
 *  - `sending`: A boolean indicating whether the content is being sent to the API.
 */
export const useFakeApi = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const fetchContent = useCallback(async () => {
    const content = await fakeFetchContent();
      const contentState = ContentState.createFromText(content);
      setEditorState(EditorState.createWithContent(contentState));
      setLoading(false);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleEditorChange = useCallback((newState: EditorState) => {
    setEditorState(
      (prevState) => (prevState === newState ? prevState : newState) // Avoid unnecessary state updates
    );
  }, []);

  const sendContent = useCallback(async () => {
    setSending(true);
    const rawContent = convertToRaw(editorState.getCurrentContent());
    await fakeSendContent(JSON.stringify(rawContent, null, 2));
    setSending(false);
  }, [editorState]);

  return { editorState, handleEditorChange, sendContent, loading, sending };
};
