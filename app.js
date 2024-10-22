import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./home.js";
import * as serviceWorker from "./serviceWorker.js";

import NewEntryPoint from "./newEntryPoint.jsx";

ReactDOM.render(
  <Router>
    <Routes>
      {/* Define the /preview route */}
      <Route path="/create-submission" element={<NewEntryPoint />} />

      {/* Define the home route */}
      <Route path="/" element={<App />} />
      <Route path="/form" element={<NewEntryPoint />} />
    </Routes>
  </Router>,
  document.getElementById("form-builder")
);

serviceWorker.unregister();
