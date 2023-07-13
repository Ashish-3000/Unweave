import React from "react";
import EditBox from "../../blog/EditBox";

function Savedblogs({ blogs, edit = 1 }) {
  return (
    <div>
      Saved Blogs
      <div>
        {blogs.map((blog, key) => {
          if (blog.saved === 1)
            return (
              <div>
                <EditBox key={key} blog={blog} />
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default Savedblogs;
