"use client";

import Image from "next/image";
import login from "../../../../public/login.png";
import { useState } from "react";
import { signin, authenticate, sendOtp } from "../../../helper/authentication";
import Link from "next/link";

function page() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { email, password, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const [isLoading, setLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
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
    <div
      id="signin"
      className="mx-1 md:mx-0 grid h-screen md:grid-cols-2 bg-gray-100"
    >
      <div className="tablet-centered my-auto">
        <div className="content-grid home-hero">
          <div className="danger" role="alert">
            {error && <span>{error}</span>}
          </div>
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

          <div className="email-input mx-auto my-8">
            <label htmlFor="password" className="text-xl font-bold">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              required
              onChange={handleChange("password")}
            />
          </div>
        </div>
        <div className="w-full">
          <button
            className="large-button w-full"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            <div className="large-button-text">
              {isLoading ? "Logging in..." : "Log in"}
            </div>
          </button>
        </div>
        <div className="text-blue-500 flex justify-between mt-4">
          <Link href="/password/#password">Forgot Password</Link>
          <Link href="/signup/#signup">New User</Link>
        </div>
      </div>

      <div className="hidden md:block bg-navy border-right">
        <Image src={login} alt="login" className="object-cover w-full h-full" />
      </div>
      {success && successMessage()}
    </div>
  );
}

export default page;
