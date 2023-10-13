export interface AppProps {
  text?: any;
}

export default function App({ text }) {
  return (
    <main>
      <h1>Microfrontend 1</h1>
      <section>
        <p>Content of Microfrontend 1</p>
        <p>Prop "text" value: {text}</p>
      </section>
    </main>
  );
}
