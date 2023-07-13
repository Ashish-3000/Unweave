import React from "react";
import Box from "../../blog/Box";
import EditBox from "../../blog/EditBox";

function Publishedblogs({ blogs, selected }) {
  return (
    <div>
      Published Blogs
      {blogs.map((blog, key) => {
        if (blog.saved === 0)
          return (
            <div>
              <EditBox key={key} blog={blog} selected={selected} />
            </div>
          );
      })}
    </div>
  );
}

export default Publishedblogs;
