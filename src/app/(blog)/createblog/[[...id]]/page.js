"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import EditorJsRenderer from "../../../../components/editor/EditorJsRenderer";
import { getAllTags } from "../../../../helper/tagapicalls";
import { isAuthenticated } from "../../../../helper/authentication";
import {
  createBlog,
  getBlogforEdit,
  updateBlog,
} from "../../../../helper/blogapicalls";
import Image from "next/image";
import Upload from "../../../../helper/Upload";
import Balancer from "react-wrap-balancer";
import Select from "react-select";

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const EditorBlock = dynamic(
  () => import("../../../../components/editor/CustomEditor"),
  {
    ssr: false,
  }
);

export default function page({ params }) {
  const { user } = isAuthenticated();
  //state to hold output data. we'll use this for rendering later
  const [data, setData] = useState({});
  const [url, setUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/blog-app-b0336.appspot.com/o/boy%20exploring%20tech%20world.png?alt=media&token=351dd642-2409-46ec-8505-ed2daca4861f"
  );
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [preview, setPreview] = useState(false);
  const [create, setCreate] = useState(true);
  const [_id, setId] = useState(params.id);
  const [defaultTags, setDefaultTags] = useState();

  useEffect(() => {
    if (params.id !== "undefined" && params.id != null) {
      getBlogforEdit(_id).then((data) => {
        setCreate(false);
        setData(data.content[0]);
        setTitle(data.title);
        setFile(data.file);
        setSelectedTags(data.tags);
      });
    }
    getAllTags().then((data) => {
      const arr = [];
      data.map((data) => {
        arr.push({ value: data.name, label: data.name, id: data._id });
      });
      setTags(arr);
    });
  }, [_id, params.id]);

  const types = ["image/png", "image/jpeg", "image/jfif", "image/jpg"];
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  const onSubmit = async (key) => {
    if (title === "") {
      setError("Title must not be empty");
      return;
    }
    const content = data;
    let tagList = [];
    selectedTags.map((tag) => {
      tagList.push(tag.id);
    });

    const blog = {
      title: title,
      photo: url,
      content: content,
      saved: key === "saved" ? 1 : 0,
      published: key === "published" ? 1 : 0,
      tags: tagList,
    };
    create
      ? await createBlog(blog)
          .then((data) => {
            if (data?.error) {
              setError(data.error);
            } else {
              // router.push(`/author/${user.penname}`);
              window.location.href = `/author/${user.penname}`;
            }
          })
          .then((err) => {
            console.log(err);
          })
      : await updateBlog({ blog, _id })
          .then((data) => {
            if (data?.error) {
              setError(data?.error);
            } else {
              window.location.href = `/author/${user.penname}`;
            }
          })
          .then((err) => {
            console.log(err);
          });
  };

  function handleSelect(data) {
    setSelectedTags(data);
  }

  return (
    <div className="w-10/12 md:w-3/4 mx-auto mt-4 mb-96">
      <div className="side-margin flex justify-end gap-2">
        <button
          className="btn-primary"
          onClick={() => {
            setPreview(!preview);
          }}
        >
          {preview ? <p>Edit</p> : <p>Preview</p>}
        </button>
        <button
          className="btn-primary text-white bg-blue-300"
          onClick={() => {
            onSubmit("saved");
          }}
        >
          Save
        </button>
        <button
          className="btn-primary text-white bg-blue-800"
          onClick={() => {
            onSubmit("published");
          }}
        >
          Publish
        </button>
      </div>
      <div className="w-full mx-auto mt-8">
        {error && <div>{error}</div>}

        {!preview ? (
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Title"
            aria-label="Title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="text-center mb-4">
            <Balancer>{title}</Balancer>
          </h1>
        )}
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={changeHandler}
        />
        {url === "" && (
          <label
            type="button"
            className="mt-3 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
            htmlFor="file"
          >
            Add Image
          </label>
        )}
        {file && <Upload setUrl={setUrl} file={file} />}
        {url !== "" && (
          <div className="m-3 flex flex-col flex-items-center items-center">
            <Image
              src={url}
              className="object-cover w-full h-96"
              height={100}
              width={100}
              alt=""
              priority
              quality={80}
            />
            {!preview && (
              <label
                type="button"
                className="ml-3 mt-4 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                onClick={() => {
                  setFile("");
                  setUrl("");
                }}
              >
                Remove
              </label>
            )}
          </div>
        )}

        {!preview && (
          <>
            <p className="text-sm">
              Editor is WYSIWYG. So, dont worry about the preview. The title
              will be a bit different in size 😳. But in case you are worried
              click the preview button.
            </p>
            <p className="text-sm">
              If you does not see the required tag. Pls. Send a Request. Would
              be happy to create new tags.
            </p>
            <div className="z-20 relative">
              <Select
                isMulti
                value={selectedTags}
                onChange={handleSelect}
                options={tags}
              />
            </div>
            <div className="w-full mb-40 z-[-10]">
              <EditorBlock
                data={data}
                onChange={setData}
                holder="editorjs-container"
                readOnly={preview}
              />
            </div>
          </>
        )}
        <div>
          {preview && (
            <>
              <div className="w-full">
                <EditorBlock
                  data={data}
                  onChange={setData}
                  holder="editorjs-container"
                  readOnly={preview}
                />
              </div>
              <div className="md:ml-28 mt-4 mb-4">
                {selectedTags.map((tag, key) => {
                  return (
                    <div
                      key={key}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      <div className="flex text-black relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        {tag.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
