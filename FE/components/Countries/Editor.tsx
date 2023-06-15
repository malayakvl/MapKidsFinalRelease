import React, { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { setEditorContentAction } from "../../redux/layouts/actions";

const MySunEditor = () => {
  // const [templateName, setTemplateName] = useState(initialTemplateName);
  // const [tempVar, setTempVar] = useState(initialTempVar);

  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: any) => {
    editor.current = sunEditor;
  };
  const handleChange = (content: any) => {
    setEditorContentAction(content);
  };

  return (
    <div className="mt-10">
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
        lang="en"
        name={`article_description`}
        defaultValue={`hello world`}
        onChange={handleChange}
        getSunEditorInstance={getSunEditorInstance}
        height="60vh"
      />
    </div>
  );
};
export default MySunEditor;