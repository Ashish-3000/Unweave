"use client";
import Image from "next/image";
import * as Separator from "@radix-ui/react-separator";
import Exploring from "../../../public/exploring.png";
import Multiselect from "multiselect-react-dropdown";
import { addTag, removeThisTag } from "../../helper/edittagapi";
import { getAllTags } from "../../helper/tagapicalls";
import { useState, useEffect } from "react";
import Space from "../../../public/space.gif";
import Upload from "../../helper/Upload";

function page() {
  const [option, setOption] = useState(true);
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [values, setValues] = useState({
    error: "",
    success: "",
  });
  const [removeTag, setRemoveTag] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    getAllTags()
      .then((data) => {
        setTags(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const types = [
    "image/png",
    "image/jpeg",
    "image/jfif",
    "image/jpg",
    "image/gif",
  ];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setValues({ ...values, ["error"]: "" });
    } else {
      setFile(null);
      setValues({ ...values, ["error"]: data.error });
    }
  };

  const { error, success } = values;

  const addTags = () => {
    const tag = {
      name: tagName,
      photo: url,
    };
    addTag(tag)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, ["error"]: data.error });
        } else setValues({ ...values, ["success"]: data.message });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeTags = () => {
    removeThisTag(removeTag)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, ["error"]: data.error, ["success"]: "" });
        } else
          setValues({ ...values, ["success"]: data.message, ["error"]: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSelect = (selectedList, selectedItem) => {
    setRemoveTag(selectedItem);
  };

  const onRemove = (selectedList, removedItem) => {
    // selectedList = selectedList.filter(removedItem);
  };

  return (
    <div className="grid md:grid-cols-8">
      <div className="md:col-span-2">
        <div className="relative mx-auto w-4/5">
          <div className="mt-8 bg-blue">
            <div>
              <Separator.Root className="w-full h-[0.1rem] bg-black my-4" />
              <div
                className=" cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setOption(true);
                }}
              >
                Add tag
              </div>
              <Separator.Root className="w-full h-[0.1rem] bg-black my-4" />
              <div
                className="= cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setOption(false);
                }}
              >
                Delete Tag
              </div>
              <Separator.Root className="w-full h-[0.1rem] bg-black my-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-6">
        <div className="w-4/5 mx-auto">
          <div className="text-center">
            {error && <div>{error}</div>}
            {success && <div>{success}</div>}
          </div>
          {option ? (
            <div>
              <div>How it will look</div>
              <div className="relative inline-flex mx-auto justify-center p-0.5 mb-2 mr-2 overflow-hidden rounded-lg text-sm font-medium group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                <div className="text-black gap-2 flex relative p-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  <Image
                    src={url === "" ? Space : url}
                    alt=""
                    width="10"
                    height="10"
                    className="w-5 h-5"
                  />
                  {tagName}
                </div>
              </div>
              <form>
                <div className="flex flex-row items-center">
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
                    <label
                      type="button"
                      className="mt-3 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                      onClick={() => {
                        setFile("");
                        setUrl("");
                      }}
                    >
                      Remove Image
                    </label>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium"
                  >
                    Tag Name
                  </label>
                  <input
                    type="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tag Name"
                    required
                    value={tagName}
                    onChange={(e) => {
                      setTagName(e.target.value);
                    }}
                  />
                </div>
                <div
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => {
                    e.preventDefault();
                    addTags();
                  }}
                >
                  Add Tag
                </div>
              </form>
            </div>
          ) : (
            <form>
              <div className="mb-6">
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium"
                >
                  Select One Tag to Remove
                </label>
                <div className="rounded w-11/12 mb-3">
                  <Multiselect
                    options={tags} // Options to display in the dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    singleSelect="true"
                    showArrow="true"
                    style={{
                      multiselectContainer: {
                        // To change css for multiselect (Width,height,etc..)
                      },
                      searchBox: {
                        // To change search box element look
                        border: "none",
                        fontSize: "20px",
                        minHeight: "50px",
                      },
                      inputField: {
                        // To change input field position or margin
                        margin: "5px",
                      },
                      chips: {
                        // To change css chips(Selected options)
                        border: "1px solid",
                        backgroundColor: "#FBAF00",
                      },
                      optionContainer: {
                        // To change css for option container
                        // border: "2px solid",
                      },
                      option: {
                        // To change css for dropdown options
                        color: "black",
                        backgroundColor: "white",
                      },
                      groupHeading: {
                        // To chanage group heading style
                      },
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  removeTags();
                }}
              >
                Remove Tag
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
