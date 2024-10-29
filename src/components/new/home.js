import React, { useEffect, useState } from "react";
import { FormBuilderEventKeys } from "../../utils.js";
import PreviewSubmission from "./previewSubmission.jsx";
import CreateSubmission from "./createSubmission.jsx";
import CreateOrEditForm from "./createOrEditForm.jsx";

const Home = () => {
  const [pageData, setPageData] = useState();

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        switch (event.data.key) {
          case FormBuilderEventKeys.CreateSubmission:
            const questionData = event.data?.questionData;
            setPageData({
              questionData,
              key: FormBuilderEventKeys.CreateSubmission,
            });
            return;
          case FormBuilderEventKeys.LoadEditForm:
            const data = event.data.data;
            setPageData({
              data,
              key: FormBuilderEventKeys.LoadEditForm,
            });
            return;
          case FormBuilderEventKeys.PreviewSubmission:
            const submittedFormData = event.data?.data;
            setPageData({
              submittedFormData,
              key: FormBuilderEventKeys.PreviewSubmission,
            });
            return;
          default:
            return;
        }
      },
      false
    );
  }, [setPageData]);

  return (
    <>
      {pageData?.key === FormBuilderEventKeys.PreviewSubmission &&
        !!pageData?.submittedFormData?.answerData && (
          <div className="flex justify-center items-center h-screen p-5">
            <div className="w-full max-w-[900px]">
              <PreviewSubmission formData={pageData?.submittedFormData}/>
            </div>
          </div>
        )}
      {pageData?.key === FormBuilderEventKeys.CreateSubmission &&
        !!pageData?.questionData?.length && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh", padding: "20px" }}
          >
            <div style={{ width: "80%", maxWidth: "900px" }}>
              <CreateSubmission
                formData={pageData?.questionData}
                showButtons={true}
              />
            </div>
          </div>
        )}
      {(!pageData?.key ||
        pageData?.key === FormBuilderEventKeys.LoadEditForm) && (
        <CreateOrEditForm data={pageData?.data} />
      )}
    </>
  );
};

export default Home;
