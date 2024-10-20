import React, { useState, useEffect } from "react";
import Preview from "./preview";

export default function NewEntryPoint() {
  // const [formData, setFormData] = useState([]);
  const [questionData, setQuestionData] = useState([]);

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
        console.log(event);
        // if (event.origin === "http://localhost:3000") {
        const formData = event.data?.questionData;

        setQuestionData(formData);
        // }
      },
      false
    );
  }, [questionData]);

  const handleSubmit = () => {
    // console.log("Submitting form data:", formData);
    // Add any form submission logic here
  };

  return (
    <>
      {!!questionData?.length && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh", padding: "20px" }}
        >
          <div style={{ width: "80%", maxWidth: "900px" }}>
            <Preview formData={questionData} showButtons={true} />
          </div>
        </div>
      )}
    </>
  );
}
