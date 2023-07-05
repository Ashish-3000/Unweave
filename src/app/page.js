import NewsLetter from "../components/Newsletter";

import Introsection from "../components/intro/Introsection";

export default function Home() {
  return (
    <div className="">
      <Introsection />
      <div>
        <NewsLetter />
      </div>
    </div>
  );
}
