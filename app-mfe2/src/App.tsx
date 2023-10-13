import { useCallback, useEffect, useState } from "react";

/**
 * Typescript doesn't like Custom Events,
 * you have to use this approach to trick the parser;
 */
declare global {
  interface WindowEventMap {
    UpdateText: CustomEvent;
  }
}

export default function App() {
  const [text, setText] = useState<string>("");

  const handleUpdateTextEvent = useCallback(
    (e: CustomEvent<string>) => {
      console.log(e);
      setText(e.detail);
    },
    [setText],
  );

  useEffect(() => {
    window.addEventListener("UpdateText", handleUpdateTextEvent);

    return () => {
      window.removeEventListener("UpdateText", handleUpdateTextEvent);
    };
  }, []);

  return (
    <main>
      <h1>Microfrontend 2</h1>
      <section>Content of Microfrontend 2</section>
      <section>I am a value updated via an event: {text}</section>
    </main>
  );
}
