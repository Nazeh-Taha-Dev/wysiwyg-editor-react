import React, { useState, useCallback, useMemo } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "./style.css";
import Spinner from "../Spinner";

type WysiwygEditorProps = {
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  className?: string;
  style?: React.CSSProperties;
  isLoading?: boolean;
  renderToolbar?: Array<"Bold" | "Italic" | "Underline">;
};


/**
 * A WYSIWYG editor component using draft-js.
 *
 * @param {WysiwygEditorProps} props
 * @prop {EditorState} value - The current state of the editor. If not provided, the editor will be uncontrolled.
 * @prop {function} onChange - A callback to be called whenever the editor state changes. If not provided, the editor will be uncontrolled.
 * @prop {string} className - An optional class name to be added to the component.
 * @prop {React.CSSProperties} style - An optional style object to be added to the component.
 * @prop {boolean} isLoading - Whether or not the editor is in a loading state. If true, a spinner will be displayed.
 * @prop {Array<"Bold" | "Italic" | "Underline">} renderToolbar - An optional array of toolbar buttons to be rendered.
 *
 * @example
 * <WysiwygEditor />
 * <WysiwygEditor value={editorState} onChange={(newState) => setEditorState(newState)} />
 */
const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  className,
  style,
  isLoading,
  renderToolbar = ["Bold", "Italic", "Underline"],
}) => {
  // Internal state only if `value` is not controlled externally
  const [internalState, setInternalState] = useState(EditorState.createEmpty());

  // Memoize editorState to avoid unnecessary recalculations
  const editorState = useMemo(() => value ?? internalState, [value, internalState]);

  // Avoid re-creating the function unless dependencies change
  const handleEditorChange = useCallback(
    (newState: EditorState) => {
      if (onChange) {
        onChange(newState);
      } else {
        // Avoid setting state if the new state is the same
        setInternalState((prevState) => (prevState === newState ? prevState : newState));
      }
    },
    [onChange]
  );

  const toggleInlineStyle = useCallback(
    (style: string) => {
      handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    },
    [editorState, handleEditorChange]
  );

  const handleKeyCommand = useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        handleEditorChange(newState);
        return "handled";
      }
      return "not-handled";
    },
    [handleEditorChange]
  );

  return (
    <div className={`wysiwyg-editor ${className}`} style={style}>
      <div className="toolbar">
        {renderToolbar.map((el) => (
          <button onClick={() => toggleInlineStyle(el.toUpperCase())} key={el}>
            {el}
          </button>
        ))}
      </div>
      <div className="editor-area">
        {isLoading ? (
          <Spinner />
        ) : (
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            handleKeyCommand={handleKeyCommand}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(WysiwygEditor);
