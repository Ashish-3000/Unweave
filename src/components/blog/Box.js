import Link from "next/link";
import Image from "next/image";

function Box({ blog }) {
  return (
    <div className="w-11/12 md:w-3/4 mx-auto ">
      <Link href={"/blog/" + blog.title + "/" + blog._id}>
        <div className="flex gap-2 items-center side-margin border-gray-200 h-20 md:h-24 overflow-hidden md:overflow-visible">
          {blog.photo !== "" && (
            <Image
              width="100"
              height="100"
              className="h-16 w-20 md:h-24 md:w-28"
              src={blog.photo}
              alt=""
              priority
              quality={100}
            />
          )}
          <div>
            <div>
              <h2 className="font-semibold">{blog.title}</h2>
              <p className="text-gray-500">{blog.penname}</p>
            </div>
          </div>
        </div>
      </Link>
      <hr className="border-black border-[1px] my-2 md:my-4" />
    </div>
  );
}
export default Box;
