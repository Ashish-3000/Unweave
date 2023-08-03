"use client";
import { useState } from "react";
import Image from "next/image";
import Exploring from "../../../../public/exploring.png";
import { updateLinks, updatePic } from "../../../helper/userapicalls";
import Upload from "@/helper/Upload";

function EditProfile({ user }) {
  const [links, setLinks] = useState({
    twitter: (user.links || [])[0]?.twitter,
    github: (user.links || [])[0]?.github,
    linkedin: (user.links || [])[0]?.linkedin,
    mysite: (user.links || [])[0]?.mysite,
  });

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(user.photo);

  const [error, setError] = useState("");
  const { twitter, github, linkedin, mysite } = links;

  const handleChange = (name) => (e) => {
    setLinks({ ...links, [name]: e.target.value });
  };

  const types = [
    "image/png",
    "image/jpeg",
    "image/jfif",
    "image/jpg",
    "image/gif",
  ];

  const changePic = () => {
    updatePic(url).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        window.location.href = `/author/${user.penname}`;
      }
    });
  };

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

  const onSubmit = (e) => {
    e.preventDefault();
    updateLinks(links)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          window.location.href = `/author/${user.penname}`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-4/5 mx-auto">
      <form>
        <div className="flex flex-row items-center">
          <Image
            src={url === "" ? Exploring : url}
            alt=""
            width="100"
            height="100"
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
          />
          <div className="flex flex-row items-center pl-2">
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
              <div className="flex flex-col md:flex-row">
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
                <label
                  type="button"
                  className="mt-3 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                  onClick={() => {
                    changePic();
                  }}
                >
                  Upload Image
                </label>
              </div>
            )}
          </div>
        </div>
        {/* <div className="mb-6">
          <label htmlFor="text" className="block mb-2 text-sm font-medium">
            Penname
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Penname"
            onChange={handleChange("penname")}
          />
        </div> */}
        <div className="mb-6">
          <label htmlFor="text" className="block mb-2 text-sm font-medium">
            Twitter
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Twitter Link"
            onChange={handleChange("twitter")}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="text" className="block mb-2 text-sm font-medium">
            Github
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Github Link"
            onChange={handleChange("github")}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="text" className="block mb-2 text-sm font-medium">
            Linked In
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Linked In Link"
            onChange={handleChange("linkedin")}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="text" className="block mb-2 text-sm font-medium">
            mysite
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="My mysite"
            onChange={handleChange("mysite")}
          />
        </div>

        <div
          type="submit"
          className="text-white bg-blue-700
          hover:bg-blue-800 focus:ring-4 
          focus:outline-none focus:ring-blue-300 
          font-medium rounded-lg text-sm 
          sm:w-auto px-5 py-2.5 
          text-center dark:bg-blue-600
           dark:hover:bg-blue-700
            dark:focus:ring-blue-800"
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Save
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
