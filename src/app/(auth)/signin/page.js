"use client";

import Image from "next/image";
import login from "../../../../public/login.png";
import { useState } from "react";
import { signin, authenticate } from "../../../helper/authentication";

function page() {
  const [values, setValues] = useState({
    email: "",
    password: process.env.PASSWORD,
    error: "",
    success: false,
  });

  const { email, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const [isLoading, setLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(values);
    signin(values)
      .then((data) => {
        if (data.error) {
          setLoading(false);
          setValues({ ...values, ["error"]: data.error });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              ["success"]: true,
            });
          });
        }
      })
      .catch((err) => {
        console.log("Try again");
      });
  }

  const successMessage = () => {
    window.location.href = "/";
  };

  return (
    <div className="mx-1 md:mx-0 grid h-screen md:grid-cols-2 bg-gray-100">
      <div className="tablet-centered my-auto">
        <form
          className="content-grid home-hero"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {error && (
            <div className="danger" role="alert">
              Sorry you are not registered, Try Again
            </div>
          )}
          <h1 className="font-extrabold text-2xl">Lets Go</h1>
          <div className="email-input mx-auto my-8">
            <label htmlFor="email" className="text-xl font-bold">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              required
              onChange={handleChange("email")}
            />
          </div>
          <button
            className="large-button"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            <div className="large-button-text">
              {isLoading ? "Logging in..." : "Log in"}
            </div>
          </button>
        </form>
      </div>
      <div className="hidden md:block bg-navy border-right">
        <Image src={login} alt="login" className="object-cover w-full h-full" />
      </div>
      {success && successMessage()}
    </div>
  );
}

export default page;
