/**
 * Development use only!
 * Dead code elimination will remove this in production.
 */
import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import "@/App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  React.createElement(App, null, null),
);
