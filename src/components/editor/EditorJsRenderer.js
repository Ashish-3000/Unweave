//components/EditorJsRenderer.tsx

import React from "react";

//use require since editorjs-html doesn't have types
const editorJsHtml = require("editorjs-html");
const EditorJsToHtml = editorJsHtml();

const EditorJsRenderer = ({ data }) => {
  const html = EditorJsToHtml.parse(data);
  return (
    //✔️ It's important to add key={data.time} here to re-render based on the latest data.
    <div className="" key={data.time}>
      {html.map((item, index) => {
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </div>
  );
};

export default EditorJsRenderer;
