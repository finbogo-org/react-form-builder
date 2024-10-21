import React, { useEffect, useState } from "react";
import * as variables from "./variables.js";
import DemoBar from "./demobar.js";
import FormBuilder from "./src/index.jsx";

const url = "/api/formdata";
const saveUrl = "/api/formdata";

const App = () => {
  const [dataForm, setDataForm] = useState([]);

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        // if (event.origin === "http://localhost:3000") {
        const formData = event.data;

        console.log(formData, "formDataformDataformDataformData");

        setDataForm(formData);
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
