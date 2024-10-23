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
          case FormBuilderEventKeys.PostQuestionData:
            const questionData = event.data?.questionData;
            setPageData({
              questionData,
              key: FormBuilderEventKeys.PostQuestionData,
            });
            return;
          case FormBuilderEventKeys.PostEditForm:
            const data = event.data.data;
            setPageData({
              data,
              key: FormBuilderEventKeys.PostEditForm,
            });
            return;
          case FormBuilderEventKeys.LoadSubmittedForm:
            const submittedFormData = event.data?.data;
            setPageData({
              submittedFormData,
              key: FormBuilderEventKeys.LoadSubmittedForm,
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
      {pageData?.key === FormBuilderEventKeys.LoadSubmittedForm &&
        !!pageData?.submittedFormData?.answerData?.length && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh", padding: "20px" }}
          >
            <div style={{ width: "80%", maxWidth: "900px" }}>
              <PreviewSubmission formData={pageData?.submittedFormData} />
            </div>
          </div>
        )}
      {pageData?.key === FormBuilderEventKeys.PostQuestionData &&
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
        pageData?.key === FormBuilderEventKeys.PostEditForm) && (
        <CreateOrEditForm data={pageData?.data} />
      )}
    </>
  );
};

export default Home;
