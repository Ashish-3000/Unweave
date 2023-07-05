import { getAllBlogs } from "../../helper/blogapicalls";
import Box from "../../components/blog/Box";
import Link from "next/link";

async function page() {
  const blogs = await getAllBlogs();
  return (
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
  );
}

export default page;
