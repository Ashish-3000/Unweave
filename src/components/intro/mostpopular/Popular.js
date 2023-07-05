import Link from "next/link";

function Popular({ blogs }) {
  return (
    <div className="h-full">
      <hr className="w-20 h-1 bg-yellow border-0 rounded md:my-10 dark:bg-yellow-700" />
      <div>
        <h1 className="mb-8 text-2xl font-bold">MOST POPULAR</h1>
        <div className="h-full flex flex-col justify-between">
          {blogs &&
            blogs.map((blog, index) => {
              if (index < 4)
                return (
                  <div key={index}>
                    <Link href={"/blog" + blog.title + "/" + blog._id}>
                      <div className=" text-xl">{blog.title}</div>
                    </Link>
                    <hr className="h-px my-8 mx-4 bg-gray-200 border-0 dark:bg-gray-700" />
                  </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}

export default Popular;
