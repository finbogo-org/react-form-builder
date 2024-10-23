import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker.js";
import Home from "./src/components/new/home.js";

ReactDOM.render(<Home />, document.getElementById("form-builder"));

// Unregister the service worker to avoid caching issues
serviceWorker.unregister();
