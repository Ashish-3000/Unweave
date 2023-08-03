import Link from "next/link";
import { getAllTags } from "../../helper/tagapicalls";
import Image from "next/image";
import Space from "../../../public/space.gif";

export default async function page({}) {
  const tags = await fetch(
    `${API}/alltags`,
    {
      method: "GET",
    },
    {
      cache: "no-store",
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="min-h-screen">
      <p className="text-4xl text-center font-bold">TAGS</p>
      <div className="m-auto w-3/4">
        {tags?.length > 0 &&
          tags.map((tag, key) => {
            return (
              <div
                key={key}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <Link href={"/tags/" + tag.name}>
                  <div className="text-black gap-2 flex relative p-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    {tag.photo && (
                      <Image
                        src={tag.photo}
                        alt=""
                        width="10"
                        height="10"
                        className="w-5 h-5"
                      />
                    )}
                    {tag.name}
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
