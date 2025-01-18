# WYSIWYG Editor Component

A flexible, reusable WYSIWYG editor component built with React and `draft-js`. It supports both controlled and uncontrolled modes, customizable toolbars, and a loading state.

## Features
- Controlled and uncontrolled editor modes
- Basic text formatting: **Bold**, *Italic*, and _Underline_
- Customizable toolbar buttons
- Loading state with a spinner
- Memoized state management for better performance

## Steps to Run the Project Locally

### Step 1:Clone the Repository

```bash
git clone https://github.com/Nazeh-Taha-Dev/wysiwyg-editor-react.git
cd wysiwyg-editor-react-v2
```

### Step 2:Install Dependencies
Ensure you have NodeJs (v16+ recommended) installed, then run:

```bash
npm install
```

### Step 3:Start the Development Server

```bash
npm start
```

### Step 4: Access the Application

Open your browser and navigate to:
http://localhost:5173/

## Usage

### Uncontrolled Mode

```tsx
import React from "react";
import WysiwygEditor from "./WysiwygEditor";

const App = () => {
  return <WysiwygEditor />;
};

export default App;
```

### Controlled Mode

```tsx
import React, { useState } from "react";
import { EditorState } from "draft-js";
import WysiwygEditor from "./WysiwygEditor";

const App = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  
  return <WysiwygEditor value={editorState} onChange={setEditorState} />;
};

export default App;
```

### Customizing Toolbar

```tsx
<WysiwygEditor renderToolbar={["Bold", "Italic"]} />
```

### Adding a Loading State

```tsx
<WysiwygEditor isLoading={true} />
```

## Props

| Prop            | Type                                      | Description |
|----------------|-------------------------------------------|-------------|
| `value`        | `EditorState`                            | Controlled editor state |
| `onChange`     | `(editorState: EditorState) => void`     | Callback for handling changes |
| `className`    | `string`                                 | Custom CSS class |
| `style`        | `React.CSSProperties`                    | Inline styles |
| `isLoading`    | `boolean`                                | Displays a spinner when `true` |
| `renderToolbar`| `boolean` `Italic` `Underline` `as array`| Custom toolbar buttons |

## Code Quality
- Uses `React.memo` for performance optimization
- Implements best practices such as `useCallback` and `useMemo`