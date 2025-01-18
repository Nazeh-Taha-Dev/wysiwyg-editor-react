import { fireEvent, render } from "@testing-library/react";

import WysiwygEditor from ".";
import { EditorState } from "draft-js";
import "@testing-library/jest-dom";

describe("WysiwygEditor", () => {
  let editorState: EditorState;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    editorState = EditorState.createEmpty();
  });

  it("renders without crashing", () => {
    const { container } = render(<WysiwygEditor />);
    expect(container).toBeInTheDocument();
  });

  it("toggles Bold formatting when Bold button is clicked", () => {
    const { getByText } = render(
      <WysiwygEditor value={editorState} onChange={onChangeMock} />
    );

    // Simulate clicking the Bold button
    const boldButton = getByText("Bold");
    fireEvent.click(boldButton);

    // Check if onChange was called (the state has been updated)
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    // Get the updated editor state (since it would be passed to onChange)
    const updatedEditorState = onChangeMock.mock.calls[0][0]; // The updated editor state

    // Check if the 'BOLD' style is applied to the current selection
    const currentStyles = updatedEditorState.getCurrentInlineStyle();
    expect(currentStyles.has("BOLD")).toBe(true); // Assert that 'BOLD' style is applied
  });

  it("toggles Italic formatting when Italic button is clicked", () => {
    const { getByText } = render(
      <WysiwygEditor value={editorState} onChange={onChangeMock} />
    );

    // Simulate clicking the Italic button
    const italicButton = getByText("Italic");
    fireEvent.click(italicButton);

    // Assert that onChange is called after clicking the button
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    // Get the updated editor state (passed as the first argument to onChangeMock)
    const updatedEditorState = onChangeMock.mock.calls[0][0];

    // Check if the 'ITALIC' style is applied to the current selection
    const currentStyles = updatedEditorState.getCurrentInlineStyle();
    expect(currentStyles.has("ITALIC")).toBe(true); // Assert that 'ITALIC' style is applied
  });

  it("toggles Underline formatting when Underline button is clicked", () => {
    const { getByText } = render(
      <WysiwygEditor value={editorState} onChange={onChangeMock} />
    );

    // Simulate clicking the Underline button
    const underlineButton = getByText("Underline");
    fireEvent.click(underlineButton);

    // Assert that onChange is called after clicking the button
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    // Get the updated editor state (passed as the first argument to onChangeMock)
    const updatedEditorState = onChangeMock.mock.calls[0][0];

    // Check if the 'UNDERLINE' style is applied to the current selection
    const currentStyles = updatedEditorState.getCurrentInlineStyle();
    expect(currentStyles.has("UNDERLINE")).toBe(true); // Assert that 'UNDERLINE' style is applied
  });

  it("displays the loading spinner when isLoading is true", () => {
    const { getByText } = render(<WysiwygEditor isLoading={true} />);
    expect(getByText(/loading/i)).toBeInTheDocument(); // Assuming Spinner has a loading text
  });

  it("renders the toolbar buttons", () => {
    const { getByText } = render(
      <WysiwygEditor renderToolbar={["Bold", "Italic"]} />
    );
    expect(getByText("Bold")).toBeInTheDocument();
    expect(getByText("Italic")).toBeInTheDocument();
  });

  it("calls onChange when editor state changes", () => {
    const { getByText } = render(
      <WysiwygEditor value={editorState} onChange={onChangeMock} />
    );

    // Simulate a change in the editor
    const boldButton = getByText("Bold");
    fireEvent.click(boldButton);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("maintains internal state when value is not provided", () => {
    const { getByText } = render(<WysiwygEditor />);

    // Simulate clicking the Bold button
    const boldButton = getByText("Bold");
    fireEvent.click(boldButton);

    // It shouldn't call the onChangeMock since onChange isn't provided
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it("handles key commands correctly", () => {
    render(<WysiwygEditor value={editorState} onChange={onChangeMock} />);

    // Mock keyboard event
    fireEvent.keyDown(document, { key: "B", ctrlKey: true });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
