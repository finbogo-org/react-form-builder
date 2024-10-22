import React, { useState, useEffect } from "react";
import { FormBuilderEventKeys } from "./src/utils";
import CreateSubmission from "./createSubmission";

export default function LoadFormSubmission() {
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        if (event?.data?.key === FormBuilderEventKeys.PostQuestionData) {
          const formData = event.data?.questionData;
          setQuestionData(formData);
        }
      },
      false
    );
  }, []);

  return (
    <>
      efjksbwfhfrehwfsjfnhjbhb
      {!!questionData?.length && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh", padding: "20px" }}
        >
          <div style={{ width: "80%", maxWidth: "900px" }}>
            <CreateSubmission formData={questionData} showButtons={true} />
          </div>
        </div>
      )}
    </>
  );
}
