import React from "react";
import "./preview.css"; // Import the CSS file
import FormBuilder from "./src/index.jsx";

const Preview = ({ formData, showButtons = true, buttonLabel = "Submit" }) => {
  console.log(formData, "formDataPreviewPreviewPreviewPreviewPreview");
  const handleSubmit = (data) => {
    console.log(data, "sdcsygvtftywemebgyy");
    // Existing form submit logic (customer handler)
    window.parent.postMessage({ answerData: data }, "*");
  };

  return (
    <div className="container">
      <h1>Form Preview</h1>
      <FormBuilder.ReactFormGenerator
        download_path="/"
        action_name={showButtons ? buttonLabel : ""}
        form_action="/"
        onSubmit={handleSubmit}
        data={formData}
        hide_actions={!showButtons}
      />
    </div>
  );
};

export default Preview;
