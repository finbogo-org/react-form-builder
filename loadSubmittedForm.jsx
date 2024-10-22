import React, { useState, useEffect } from "react";
import { FormBuilderEventKeys } from "./src/utils";
import PreviewSubmission from "./previewSubmission";

export default function LoadSubmittedForm() {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        if (event?.data?.key === FormBuilderEventKeys.LoadSubmittedForm) {
          const formData = event.data?.data;
          setData(formData);
        }
      },
      false
    );
  }, []);

  return (
    <>
      {!!data?.answerData?.length && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh", padding: "20px" }}
        >
          <div style={{ width: "80%", maxWidth: "900px" }}>
            <PreviewSubmission formData={data} />
          </div>
        </div>
      )}
    </>
  );
}
