"use client";
import Big_Blog from "./Big_Blog";
import Small_Blog from "./Small_Blog";

function Hero({ blogs }) {
  return (
    <div className="side-margin">
      <div className="md:grid md:grid-cols-2 gap-2 h-96 w-full">
        {blogs !== undefined && <Big_Blog blog={blogs[0]} />}
        {blogs !== undefined && <Small_Blog blogs={blogs} />}
      </div>
    </div>
  );
}

export default Hero;
