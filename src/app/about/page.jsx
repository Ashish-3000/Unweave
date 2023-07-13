import Image from "next/image";
import Explore from "../../../public/explore.jpg";
import "./styles.css";

function page() {
  return (
    <div id="about" className="bg-black md:mx-0 grid h-screen md:grid-cols-2">
      <div className="side-margin my-auto">
        <div className="text-black about-text text-6xl md:text-7xl lg:text-8xl font-extrabold">
          On a route <br />
          to
          <br /> exploring
          <br /> everyday
        </div>
      </div>

      <div className="hidden md:block bg-navy border-right">
        <Image
          src={Explore}
          alt="login"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default page;
