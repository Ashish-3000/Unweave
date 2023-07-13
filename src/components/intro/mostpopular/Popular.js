import Link from "next/link";

function Popular({ blogs }) {
  return (
    <div className="relative">
      <div className="w-20 h-1 bg-yellow border-0 rounded md:mt-10 md:mb-4 dark:bg-[#bbfc86]" />
      <h1 className="mb-8 text-4xl font-bold">MOST POPULAR</h1>
      <div>
        <div className="flex flex-col justify-between">
          {blogs &&
            blogs.map((blog, index) => {
              if (index < 4)
                return (
                  <div key={index}>
                    <Link href={"/blog/" + blog.title + "/" + blog._id}>
                      <div className="font-Playfair font-semibold text-xl">
                        {blog.title}
                      </div>
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
