import React, { useState, useEffect } from "react";
import { FormBuilderEventKeys } from "./src/utils";
import PreviewSubmission from "./previewSubmission";

export default function LoadSubmittedForm() {
  // const [formData, setFormData] = useState([]);
  const [data, setData] = useState([]);

  // Effect to subscribe to ElementStore and update form data
  // useEffect(() => {
  //   const onStoreUpdate = (state) => setFormData(state.data);

  //   // Subscribe to store
  //   ElementStore.subscribe(onStoreUpdate);

  //   // Cleanup function to remove listener when component unmounts
  //   return () => {
  //     ElementStore.removeListener(onStoreUpdate); // Correctly remove listener
  //   };
  // }, []);

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
  }, [data]);

  const handleSubmit = () => {
    // console.log("Submitting form data:", formData);
    // Add any form submission logic here
  };

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
