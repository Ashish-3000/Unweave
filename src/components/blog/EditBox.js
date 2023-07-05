import Link from "next/link";
import Image from "next/image";
import { isAuthenticated, isAuthorised } from "../../helper/authentication";
import { deleteBlog } from "../../helper/blogapicalls";
import { useState } from "react";

function EditBox({ blog }) {
  const [error, setError] = useState("");
  const removeBlog = (id) => {
    deleteBlog(id)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mb-8 border-b-2 border-gray-200">
      <div className="relative">
        <div className="flex flex-row items-center justify-between">
          <Link
            href={"/blog/" + blog.title + "/" + blog._id}
            state={{ blog: blog }}
          >
            <div className="p-2 flex gap-2 items-center">
              {blog.photo !== "" && (
                <Image
                  width="10"
                  height="10"
                  className="h-20 w-20 md:h-24 md:w-24"
                  src={blog.photo}
                  alt=""
                  priority
                  quality={80}
                />
              )}
              <div>
                <p className="mb-2 h-16 text-sm md:text-lg lg:text-2xl overflow-hidden">
                  {blog.title}
                </p>
              </div>
            </div>
          </Link>

          {isAuthenticated() && (
            <div className="mb-3 bottom-0 flex flex-col gap-2 md:flex-row">
              <Link
                href={"/createblog/" + blog._id}
                state={{ blogdata: blog }}
                className="inline-flex ml-3  items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </Link>
              <button
                // state={{ blogdata: blog }}
                className="inline-flex ml-3  items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  removeBlog(blog._id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditBox;
