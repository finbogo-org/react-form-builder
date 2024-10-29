import React from "react";
import "../../../preview.css"; // Import the CSS file
import FormBuilder from "../../index.jsx";

const PreviewSubmission = ({ formData }) => {
  return (
    <div className="w-auto mx-auto p-0 rounded-lg shadow-md bg-gray-100">
      <h1 className="text-center text-2xl mb-5 font-bold text-gray-800">Preview
        Submitted</h1>
      <FormBuilder.ReactFormGenerator
        download_path="/"
        action_name=""
        form_action="/"
        data={formData.questionData}
        hide_actions={true}
        answer_data={formData.answerData}
        read_only={true}
      />
    </div>
  );
};

export default PreviewSubmission;
