import React from "react";
import "./preview.css"; // Import the CSS file
import FormBuilder from "./src/index.jsx";
import { FormBuilderEventKeys } from "./src/utils.js";

const CreateSubmission = ({
  formData,
  showButtons = true,
  buttonLabel = "Submit",
}) => {
  const handleSubmit = (data) => {
    // Existing form submit logic (customer handler)
    window.parent.postMessage(
      { answerData: data, key: FormBuilderEventKeys.PostAnswerData },
      "*"
    );
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

export default CreateSubmission;
