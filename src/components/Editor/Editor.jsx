import React from "react";
import ReactQuill from "react-quill";
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};
// Trình soạn thảo
export default function TinyEditor({ data, onChange }) {
  return (
    <ReactQuill
      modules={modules}
      value={data}
      onChange={onChange}
      theme="snow"
    />
  );
}
