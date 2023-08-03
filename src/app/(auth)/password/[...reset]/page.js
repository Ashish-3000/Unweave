"use client";

import Image from "next/image";
import login from "../../../../../public/login.png";
import { useState } from "react";
import { resetPassword, authenticate } from "../../../../helper/authentication";
import Link from "next/link";
import { usePathname } from "next/navigation";

function page() {
  const queryParams = usePathname();
  const user_id = queryParams.split("/").slice(-1);
  const token = queryParams.split("/").slice(-2, -1)[0];

  const [values, setValues] = useState({
    password: "",
    token: token,
    error: "",
    success: false,
  });

  // const [otp, setOtp] = useState(false);
  // const [mail, setMail] = useState("");

  const { password, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const [isLoading, setLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    resetPassword({ values, user_id })
      .then((data) => {
        if (data.error) {
          setLoading(false);
          setValues({ ...values, ["error"]: data.error });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              ["success"]: "Password has been reset try sign in",
            });
          });
        }
      })
      .catch((err) => {
        console.log("Try again");
      });
  }

  return (
    <div
      id="password"
      className="mx-1 md:mx-0 grid h-screen md:grid-cols-2 bg-gray-100"
    >
      <div className="tablet-centered my-auto">
        <div className="content-grid home-hero">
          {error && (
            <div className="danger" role="alert">
              {error}
              <Link href="/password">Try Again</Link>
            </div>
          )}
          {success && (
            <div>
              The password has been reset{" "}
              <Link href="/signin/#signin">Sign in</Link>
            </div>
          )}
          <h1 className="font-extrabold text-2xl">Lets Go</h1>
          <div className="password-input mx-auto my-8">
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
            <div className="large-button-text">Enter the password</div>
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
