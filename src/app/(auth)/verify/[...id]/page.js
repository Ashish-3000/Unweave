"use client";
import React, { useEffect, useState } from "react";
import { verify } from "../../../../helper/authentication";
import Image from "next/image";
import Link from "next/link";
import Verify from "../../../../../public/verify.jpg";

function page({ params }) {
  const token = params.id[0];
  const id = params.id[1];
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    verify({ token, id })
      .then((data) => {
        setVerified(true);
      })
      .catch((error) => {
        setVerified(false);
        console.log(error);
        setError(error.error);
      });
  }, []);

  return (
    <div className="side-margin">
      {!verified ? (
        <>
          <h1>Doing Verification</h1>
          <div>{error}</div>
        </>
      ) : (
        <>
          <h1>Verification Successful</h1>
          <div className="text-blue-500 font-semibold">
            <Link href="/signin/#signin">Sign In</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default page;
