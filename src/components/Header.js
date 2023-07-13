"use client";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import UserDropdown from "../components/user/UserDropdown";
import { isAuthenticated } from "../helper/authentication";
import { useState, useEffect } from "react";
import Pen from "../../public/Pen.png";
import Exploring from "../../public/exploring.png";

function Header({ logged }) {
  // const loggedIn = !isAuthenticated();
  const [loggedIn, setLoggedIn] = useState(!isAuthenticated());

  return (
    <div className="side-margin flex items-center justify-between">
      <div className="flex-1">
        <Menu />
      </div>
      <div className="grow font-Permanent text-3xl md:text-5xl font-extrabold text-center m-3 flex-1">
        <Link href="/">UNWEAVE</Link>
      </div>
      <div className="flex-1 flex justify-end">
        {loggedIn ? (
          <div className="btn-subscribe">
            <Link href="#subscribe">SUBSCRIBE</Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <Link href="/createblog" className="hidden md:inline">
              <button className="btn-primary flex flex-row gap-2">
                <Image
                  src={Pen}
                  alt="userImage"
                  className="rounded-full w-6 h-6"
                />
                <div className="">Write Blog</div>
              </button>
            </Link>

            <UserDropdown></UserDropdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
