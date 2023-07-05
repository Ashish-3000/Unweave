//./components/EditorTools.js
import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ToggleBlock from "editorjs-toggle-block";
import NestedList from "@editorjs/nested-list";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import ImageTool from "@editorjs/image";
const Quote = require("@editorjs/quote");
const Warning = require("@editorjs/warning");
const Delimiter = require("@editorjs/delimiter");
const Alert = require("editorjs-alert");
const Checklist = require("@editorjs/checklist");
const LinkTool = require("@editorjs/link");
const CodeTool = require("@editorjs/code");
const RawTool = require("@editorjs/raw");
const anyButton = require("editorjs-button");
const Marker = require("@editorjs/marker");
const InlineCode = require("@editorjs/inline-code");

const API = process.env.API;
import { projectStorage } from "../../firebase/config";

const upload = (file) => {
  const storageRef = projectStorage.ref(file.name);

  return new Promise((resolve, reject) => {
    storageRef.put(file).on(
      "state_changed",
      (snap) => {},
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        resolve({
          success: 1,
          file: {
            url: url,
          },
        });
      }
    );
  });
};

export const EDITOR_TOOLS = {
  code: Code,
  header: Header,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message",
    },
  },
  delimiter: Delimiter,
  alert: {
    class: Alert,
    inlineToolbar: true,
    config: {
      defaultType: "primary",
      messagePlaceholder: "Enter something",
    },
  },
  toggle: {
    class: ToggleBlock,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 1,
      cols: 1,
    },
  },
  code: CodeTool,
  raw: RawTool,
  anyButton: {
    class: anyButton,
    inlineToolbar: false,
    config: {
      css: {
        btnColor: "btn--gray",
      },
    },
  },
  Marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },
  inlineCode: {
    class: InlineCode,
  },
  underline: Underline,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file) {
          return upload(file).then((data) => {
            return data;
          });
        },
      },
    },
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: `${API}/fetch`,
      headers: {
        Accept: "application/json",
      },
    },
  },
};
