"use client";
import { useState } from "react";
import { addSubscriber } from "../helper/subscription";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await addSubscriber(email)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setEmail("");
          setSuccess("");
        } else {
          setSuccess(data.message);
          setEmail("");
          setError("");
        }
      })
      .catch((err) => {
        setError("There is some issue on our side");
      });
  };

  return (
    <div
      id="subscribe"
      style={{ backgroundColor: "#2a2e43" }}
      className="h-96 w-full mt-8 my-auto flex justify-center items-center flex-col gap-8"
    >
      <h1 className="text-center text-white">UNWEAVE ~ Tech Newsletter</h1>
      <div className="bg-[#8ccfbd] w-11/12 md:w-96 py-6 px-2 md:p-10">
        <div className="text-center mb-4">
          Tech updates directly to your inbox
        </div>

        <form className="relative flex h-10 min-w-[200px] max-w-[24rem] mx-auto">
          <input
            type="email"
            className="peer h-full bg-[#2a2e43] w-full rounded-[7px] 
            border border-blue-gray-200 
             px-3 py-2.5 pr-20 text-sm font-normal 
             text-blue-gray-700 outline outline-0 transition-all 
             placeholder-shown:border placeholder-shown:border-blue-gray-200 
             placeholder-shown:border-t-blue-gray-200 
             focus:border-2 focus:border-pink-500 focus:border-t-transparent 
             focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            value={email}
            required
            placeholder="ENTER YOUR EMAIL"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setSuccess("");
            }}
          />
          <button
            className="!absolute right-1 top-1 z-10 
            select-none rounded bg-[#8ccfbd]
             py-2 px-4 text-center align-middle
              font-sans text-xs font-bold uppercase
               text-black shadow-md shadow-pink-500/20 
               transition-all hover:shadow-lg hover:shadow-pink-500/40
                focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
                active:shadow-none peer-placeholder-shown:pointer-events-none
                  "
            type="button"
            data-ripple-light="true"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            SUBSCRIBE
          </button>
        </form>
        {success && <div>{success}</div>}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}

export default Newsletter;
