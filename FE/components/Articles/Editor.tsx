import { Button, Card, Input, Row } from "antd";
import React, { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const MySunEditor = ({ initialTemplateName = "", initialTempVar = [] }) => {
  const [templateName, setTemplateName] = useState(initialTemplateName);
  const [tempVar, setTempVar] = useState(initialTempVar);

  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: any) => {
    editor.current = sunEditor;
  };
  // const handleCreate = () => {};

  return (
    <div className="mt-10">
      <Row>
        <SunEditor
          setOptions={{
            buttonList: [
              ["font", "fontSize", "formatBlock"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["align", "horizontalRule", "list", "table"],
              ["fontColor", "hiliteColor"],
              ["outdent", "indent"],
              ["undo", "redo"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["link", "image"],
              ["preview", "print"],
              ["fullScreen", "showBlocks", "codeView"],
            ],
          }}
          getSunEditorInstance={getSunEditorInstance}
          height="60vh"
        />
      </Row>
      <Row>
        {tempVar?.map((variable, index) => (
          <span className="m-10" key={index}>
            {variable}
          </span>
        ))}
      </Row>
    </div>
  );
};
export default MySunEditor;
