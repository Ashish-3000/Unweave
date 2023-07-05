"use client";

import Overview from "../../../components/user/Overview";
import { useState, useEffect } from "react";
import EditProfile from "../../../components/user/forms/EditProfile";
import Savedblogs from "../../../components/user/forms/Savedblogs";
import Publishedblogs from "../../../components/user/forms/Publishedblogs";
import { usePathname } from "next/navigation";
import { getAuthorBlog } from "../../../helper/userapicalls";
import { isAuthenticated, isAuthorised } from "../../../helper/authentication";
import { useRouter } from "next/navigation";

function page() {
  const [selected, setSelected] = useState(2);
  const queryParams = usePathname();
  const author = queryParams.split("/")[2];
  const [details, setDetails] = useState({
    user: {},
    blogs: [],
    success: false,
  });
  const { user, blogs, success } = details;
  const [error, setError] = useState("");

  useEffect(() => {
    getAuthorBlog(author).then((data) => {
      if (data.blogs.length === 0) {
        //navigate to page 404 user not found
        setError("No blogs have been found");
        setDetails({
          user: data.user,
          blogs: [],
          success: true,
        });
      } else {
        setDetails({
          user: data.user,
          blogs: data.blogs,
          success: true,
        });
      }
    });
  }, [author]);

  const [option, setOption] = useState(2);

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

  const { push } = useRouter();

  const signinfirst = () => {
    push("/signin");
  };

  return (
    <div>
      <div className="side-margin grid md:grid-cols-8">
        <div className="md:col-span-2">
          <Overview setSelected={setSelected} author={author} user={user} />
        </div>
        <div className="md:col-span-6">
          {selected == 0 && (
            <div>
              <EditProfile user={user} />
            </div>
          )}
          {selected == 1 && (
            <div>
              <Savedblogs blogs={blogs} />
            </div>
          )}
          {selected == 2 && (
            <div>
              <Publishedblogs blogs={blogs} selected />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
