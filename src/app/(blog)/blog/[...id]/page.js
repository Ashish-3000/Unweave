"use client";

import { getSpecficBlog } from "../../../../helper/blogapicalls";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import EditorJsRenderer from "../../../../components/editor/EditorJsRenderer";

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const EditorBlock = dynamic(
  () => import("../../../../components/editor/CustomEditor"),
  {
    ssr: false,
  }
);

function page({ params }) {
  const _id = params.id.splice(-1).toString();
  const [blog, setBlog] = useState();
  useEffect(() => {
    getSpecficBlog(_id).then((data) => {
      setBlog(data);
    });
  }, [_id]);
  return (
    <div>
      {blog && (
        <div className="w-10/12 md:w-3/5 mx-auto mt-4">
          <h1 className="text-center mb-4">{blog.title}</h1>
          <Image
            src={blog.photo}
            className="h-40 md:w-full md:h-96"
            height={500}
            width={500}
            alt={blog.title}
            priority
            quality={80}
          />
          {blog.content !== undefined && (
            <EditorBlock
              data={blog.content[0]}
              holder="editorjs-container"
              readOnly="false"
            />
          )}
          <div className="md:ml-28 mt-4 mb-4">
            {blog?.tags &&
              blog.tags?.length > 0 &&
              blog.tags.map((tag, key) => {
                return (
                  <div
                    key={key}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <div className="flex text-black relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                      {tag.photo && (
                        <Image
                          src={tag.photo}
                          alt=""
                          width="10"
                          height="10"
                          className="w-5 h-5"
                        />
                      )}
                      {tag.name}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
