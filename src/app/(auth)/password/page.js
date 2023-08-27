"use client";

import Image from "next/image";
import login from "../../../../public/login.png";
import { useState } from "react";
import { updatePassword, authenticate } from "../../../helper/authentication";
import Link from "next/link";

function page() {
  const [values, setValues] = useState({
    email: "",
    error: "",
    success: false,
  });

  // const [otp, setOtp] = useState(false);
  // const [mail, setMail] = useState("");

  const { email, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const [isLoading, setLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setValues({
      ...values,
      ["success"]: "",
      ["error"]: "",
    });
    updatePassword(values)
      .then((data) => {
        if (data.error) {
          setLoading(false);
          setValues({ ...values, ["error"]: data.error });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              ["success"]: "The reset link has been sent to your email id",
            });
          });
        }
      })
      .catch((err) => {
        setValues({
          ...values,
          ["error"]: "There might be some problem on our side",
        });
      });
  }

  return (
    <div
      id="password"
      className="mx-1 md:mx-0 grid h-screen md:grid-cols-2 bg-gray-100"
    >
      <div className="tablet-centered my-auto">
        <div className="content-grid home-hero">
          <div className="danger" role="alert">
            {error}
          </div>
          {success}
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
        </div>
        <div className="w-full">
          <button
            className="large-button w-full"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            <div className="large-button-text">Send reset link</div>
          </button>
        </div>
      </div>

      <div className="hidden md:block bg-navy border-right">
        <Image src={login} alt="login" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}

export default page;
