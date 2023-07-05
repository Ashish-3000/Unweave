import Image from "next/image";
import Link from "next/link";
import Spacex from "../../../../public/spacex.jpg";

function Viewed({ blogs }) {
  return (
    <div className="my-10 grid grid-cols-2 grid-rows-2 gap-2 w-full h-[35rem]">
      {blogs.map((blog, index) => {
        if (index >= 4 && index < 6)
          return (
            <div key={index} className="relative  ">
              <Link href={"/blog/" + blog.title}>
                <Image
                  className="object-cover h-full w-full"
                  src={blog.photo}
                  width={100}
                  height={100}
                  alt=""
                />
                <div className="absolute bottom-0 font-bold m-1">
                  <div className="text-black p-4 backdrop-blur-md">
                    {blog.title}
                  </div>
                </div>
              </Link>
            </div>
          );
      })}

      <div className="col-span-2 relative">
        <Image
          className="object-cover h-full w-full"
          src={blogs[6].photo}
          width={100}
          height={100}
          alt=""
        />
        <div className="absolute bottom-0 font-bold m-1">
          <div className="text-black  p-4 backdrop-blur-md">
            {blogs[6].title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewed;
