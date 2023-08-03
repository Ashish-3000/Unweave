"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { verifySubscriber } from "@/helper/subscription";

function page({ params }) {
  const token = params.id[0];
  const id = params.id[1];
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    verifySubscriber({ token, id })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else setVerified(true);
      })
      .catch((error) => {
        setVerified(false);
        console.log(error);
        setError(error.error);
      });
  }, []);

  return (
    <div className="side-margin ">
      {verified ? (
        <div>Thanks for subscribing to our newsletter</div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
}

export default page;
