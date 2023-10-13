// Alternative way to load custom elements

import { createElement, useCallback, useState } from "react";
const customElement1 = createElement("app-mfe1", { text: "hello world" }, null);
const customElement2 = createElement("app-mfe2", null, null);

// Look at the index.html file

export default function App() {
  const [text, setText] = useState<string>("");

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText],
  );

  const updateTextEvent = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("UpdateText", {
        bubbles: true,
        composed: false, // it must be true in the micro apps so the parent can listen
        cancelable: false,
        detail: text,
      }),
    );
  }, [text]);

  return (
    <main>
      <h1>Shell APP</h1>
      Type something here, to update the Micro App 2:
      <br />
      <br />
      <input name="text" value={text} onChange={handleTextChange} />
      <button onClick={updateTextEvent}>
        trigger an event in the micro app 2
      </button>
      <hr />
      {customElement1}
      <hr />
      {customElement2}
    </main>
  );
}
