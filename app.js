import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./home.js";
import * as serviceWorker from "./serviceWorker.js";
import LoadFormSubmission from "./loadFormSubmission.jsx";
import LoadSubmittedForm from "./loadSubmittedForm.jsx";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/create-submission" element={<LoadFormSubmission />} />
      <Route path="/preview-submission" element={<LoadSubmittedForm />} />
      <Route path="/" element={<App />} />
      <Route path="/test" element={<App />} />
      <Route path="/form" element={<LoadFormSubmission />} />
    </Routes>
  </Router>,
  document.getElementById("form-builder")
);

// Unregister the service worker to avoid caching issues
serviceWorker.unregister();
