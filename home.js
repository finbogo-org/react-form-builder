import React, { useEffect, useState } from "react";
import * as variables from "./variables.js";
import DemoBar from "./demobar.js";
import FormBuilder from "./src/index.jsx";
import { FormBuilderEventKeys } from "./src/utils.js";

const url = "/";
const saveUrl = "/";

const App = () => {
  const [dataForm, setDataForm] = useState([]);

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        // if (event.origin === "http://localhost:3000") {
        if (event.data.key === FormBuilderEventKeys.PostEditForm) {
          const formData = event.data.data;
          setDataForm(formData);
        }
        // }
      },
      false
    );
  }, [dataForm]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {" "}
      {/* Change to column direction */}
      <div style={{ alignItems: "end", width: "70%" }}>
        <DemoBar variables={variables} />
      </div>
      <div style={{ width: "70%", marginTop: "30px" }}>
        {!dataForm?.length && (
          <FormBuilder.ReactFormBuilder
            variables={variables}
            url={url}
            saveUrl={saveUrl}
            locale="en"
            saveAlways={false}
          />
        )}
        {!!dataForm?.length && (
          <FormBuilder.ReactFormBuilder
            variables={variables}
            // url={url}
            saveUrl={saveUrl}
            locale="en"
            saveAlways={false}
            editMode={true}
            edit={true}
            data={dataForm}
          />
        )}
      </div>
    </div>
  );
};

export default App;
