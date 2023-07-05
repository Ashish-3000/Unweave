import Link from "next/link";
import Image from "next/image";

function Small_Blog({ blogs }) {
  // fetch latest data from different tags mentioned above
  const blog1 = blogs[1];
  const blog2 = blogs[2];
  const blog3 = blogs[3];
  return (
    <div className="hidden md:flex md:flex-col md:gap-2 md:items-stretch md:justify-items-stretch w-full h-full">
      <div className="basis-1/3 flex flex-row items-center justify-center gap-2">
        <div className="text-black basis-1/3 h-full">
          <Link href={"/blog/" + blog1.title + "/" + blog1._id}>
            <Image
              className="object-contain w-48"
              src={blog1.photo}
              alt={blog1.title}
              width="100"
              height="10"
              priority
              quality={100}
            />
          </Link>
        </div>
        <div className="font-bold basis-2/3">
          <div className="text-black">{blog1.title}</div>
        </div>
      </div>

      <hr className="h-px my-1 mx-2 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="basis-1/3 flex flex-row items-center justify-center gap-2">
        <div className="text-black basis-1/3 h-full">
          <Link href={"/blog/" + blog2.title + "/" + blog2._id}>
            <Image
              className="object-contain w-48"
              src={blog2.photo}
              alt={blog2.title}
              width="100"
              height="10"
              priority
              quality={100}
            />
          </Link>
        </div>
        <div className="font-bold basis-2/3">
          <div className="text-black">{blog2.title}</div>
        </div>
      </div>

      <hr className="h-px my-1 mx-2 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="basis-1/3 flex flex-row items-center justify-center gap-2">
        <div className="text-black basis-1/3 h-full">
          <Link href={"/blog/" + blog3.title + "/" + blog3._id}>
            <Image
              className="object-contain w-48"
              src={blog3.photo}
              alt={blog3.title}
              width="100"
              height="10"
              priority
              quality={80}
            />
          </Link>
        </div>
        <div className="font-bold basis-2/3">
          <div className="text-black">{blog3.title}</div>
        </div>
      </div>
    </div>
  );
}

export default Small_Blog;
