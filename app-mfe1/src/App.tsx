import { useCallback, useEffect, useState } from "react";

/**
 * Typescript doesn't like Custom Events,
 * you have to use this approach to trick the parser;
 */
declare global {
  interface WindowEventMap {
    UpdateFromApp2: CustomEvent;
  }
}

export interface AppProps {
  text?: any;
}

export default function App({ text }) {
  const [textFromApp2, setText] = useState<string>("");

  const handleUpdateFromApp2Event = useCallback(
    (e: CustomEvent<string>) => {
      console.log(e);
      setText(e.detail);
    },
    [setText],
  );

  useEffect(() => {
    window.addEventListener("UpdateFromApp2", handleUpdateFromApp2Event);

    return () => {
      window.removeEventListener("UpdateFromApp2", handleUpdateFromApp2Event);
    };
  }, []);

  return (
    <main>
      <h1>Microfrontend 1</h1>
      <section>
        <p>Content of Microfrontend 1</p>
        <p>Prop "text" value: {text}</p>
        <p>Updated value via event, from the Micro app 2: {textFromApp2}</p>
      </section>
    </main>
  );
}
