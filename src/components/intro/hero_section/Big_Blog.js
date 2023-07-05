import Link from "next/link";
import Image from "next/image";

function Big_Blog({ blog }) {
  const pic = blog.photo;
  return (
    <div className="relative h-96 w-full">
      <Link
        href={"/blog/" + blog.title + "/" + blog._id}
        state={{ blog: blog }}
      >
        <Image
          className="object-cover w-full h-96"
          src={pic}
          alt=""
          width="100"
          height="10"
          priority
          quality={100}
        />
        <div className="absolute bottom-0 font-bold bg-white md:w-96 m-1">
          <div className="text-black text-2xl p-4">{blog.title}</div>
        </div>
      </Link>
    </div>
  );
}

export default Big_Blog;
