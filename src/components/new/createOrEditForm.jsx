import React from "react";
import DemoBar from "../../../demobar.js";
import * as variables from "../../../variables.js";
import FormBuilder from "../../index.jsx";

const url = "/";
const saveUrl = "/";

const CreateOrEditForm = ({ data }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "end" }}
    >
      <div style={{ alignItems: "end", width: "100%" }}>
        <DemoBar variables={variables} />
      </div>
      <div style={{ width: "100%", marginTop: "30px" }}>
        {!data?.length && (
          <FormBuilder.ReactFormBuilder
            variables={variables}
            url={url}
            saveUrl={saveUrl}
            locale="en"
            saveAlways={false}
          />
        )}
        {!!data?.length && (
          <FormBuilder.ReactFormBuilder
            variables={variables}
            saveUrl={saveUrl}
            locale="en"
            saveAlways={false}
            editMode={true}
            edit={true}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default CreateOrEditForm;
