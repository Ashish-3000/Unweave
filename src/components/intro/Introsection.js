import Hero from "./hero_section/Hero";
import MostPopular from "./mostpopular/Mostpopular";
import { getInitials } from "../../helper/blogapicalls";

async function Introsection() {
  const data = await getInitials().then((data) => {
    return data;
  });
  return (
    <>
      <div>
        <Hero blogs={data.latestblogs} />
      </div>
      <div>
        <MostPopular blogs={data.popularblogs} />
      </div>
    </>
  );
}

export default Introsection;
