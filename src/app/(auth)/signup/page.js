"use client";

import Image from "next/image";
import login from "../../../../public/login.png";
import { useState } from "react";
import { signup } from "../../../helper/authentication";

function page() {
  const [values, setValues] = useState({
    email: "",
    name: "",
    penname: "",
    password: "",
    error: "",
    success: false,
  });

  const { email, name, penname, password, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup(values)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, ["error"]: data.error });
        } else {
          setValues({
            email: "",
            name: "",
            penname: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successMessage = () => {
    window.location.href = "/login";
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
              {error}
            </div>
          )}
          <h1 className="font-extrabold text-2xl">Lets Go</h1>
          <div className="email-input mx-auto my-8">
            <label htmlFor="username" className="text-xl font-bold">
              User Name
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={name}
              required
              onChange={handleChange("name")}
            />
          </div>
          <div className="email-input mx-auto my-8">
            <label htmlFor="penname" className="text-xl font-bold">
              Pen Name
            </label>
            <input
              id="penname"
              type="text"
              name="penname"
              value={penname}
              required
              onChange={handleChange("penname")}
            />
          </div>
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
          <button
            className="large-button"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            <div className="large-button-text">SingUp</div>
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
