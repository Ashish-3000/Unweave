import { getTaggedBlogs } from "../../../helper/tagapicalls";
import Link from "next/link";
import Box from "../../../components/blog/Box";

async function page({ params }) {
  const id = params.id;
  const blogs = await getTaggedBlogs(id);
  return (
    <div className="side-margin">
      <h1 className="mb-8">{id}</h1>
      {blogs.length == 0 ? (
        <div>Coming soon</div>
      ) : (
        <div>
          {blogs.map((blog, index) => {
            return (
              <div key={index}>
                <Link
                  href={{
                    pathname: "/blog/" + blog.title + "/" + blog._id,
                  }}
                >
                  <Box blog={blog}></Box>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default page;
