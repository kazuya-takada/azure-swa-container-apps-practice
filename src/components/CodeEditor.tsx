import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import { FC } from "react";

type Props = {
  code: string;
  setCode: (value: string) => void;
};

const CodeEditor: FC<Props> = ({ code, setCode }) => {
  const handleChange = (value: string) => setCode(value);

  return (
    <div className="w-full">
      <AceEditor
        value={code}
        mode="javascript"
        theme="monokai"
        onChange={handleChange}
        name="code-editor"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        width="100%"
        height="300px"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
