import React from "react";
import "./preview.css"; // Import the CSS file
import FormBuilder from "./src/index.jsx";
import { FormBuilderEventKeys } from "./src/utils.js";

const PreviewSubmission = ({ formData }) => {
  // const handleSubmit = (data) => {
  //   // Existing form submit logic (customer handler)
  //   window.parent.postMessage(
  //     { answerData: data, key: FormBuilderEventKeys.PostAnswerData },
  //     "*"
  //   );
  // };

  return (
    <div className="container">
      <h1>Preview Submitted</h1>
      <FormBuilder.ReactFormGenerator
        download_path="/"
        action_name=""
        form_action="/"
        // onSubmit={handleSubmit}
        data={formData.questionData}
        hide_actions={true}
        answer_data={formData.answerData}
        read_only={true}
      />
    </div>
  );
};

export default PreviewSubmission;
