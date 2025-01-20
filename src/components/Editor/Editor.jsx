import React from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
export default function TinyEditor({ data }) {
  const editorRef = useRef(null);

  return (
    <>
      <Editor
        apiKey="38i5vfrydzs2luzbra2qnkcxm1ezyqdhntpk3smi5dob07p4"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={data}
        disabled={true}
        init={{
          height: 300,
          menubar: false,
          readonly: true,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
}
