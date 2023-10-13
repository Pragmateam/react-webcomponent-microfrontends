import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";

import App from "@/App";
import AppStylesheet from "@/App.css?inline";

export class Microfrontend extends HTMLElement {
  private stylesElement: HTMLStyleElement = document.createElement("style");
  private mountElement: HTMLDivElement = document.createElement("div");
  private reactRoot: Root;

  private mountComponent() {
    this.reactRoot.render(createElement(App, { root: this.shadowRoot }, null));
  }

  private unmountComponent() {
    this.reactRoot.unmount();
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.stylesElement.innerHTML = `${AppStylesheet}`;
    this.shadowRoot!.appendChild(this.stylesElement);

    this.mountElement.id = "root";
    this.shadowRoot!.appendChild(this.mountElement);

    this.reactRoot = createRoot(this.mountElement);
  }

  connectedCallback() {
    this.mountComponent();
  }

  disconnectedCallback() {
    this.unmountComponent();
  }

  attributeChangedCallback() {
    this.unmountComponent();
    this.mountComponent();
  }
}

if (!window.customElements.get("app-mfe2")) {
  window.customElements.define("app-mfe2", Microfrontend);
}
