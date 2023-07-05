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
  const loggedIn = !isAuthenticated();

  return (
    <div className="side-margin flex items-center justify-center">
      <Menu />
      <div className="grow text-3xl font-extrabold text-center m-3 flex-1">
        <Link href="/">UNWEAVE</Link>
      </div>
      <div className="">
        {loggedIn ? (
          <div className="flex gap-2 items-center justify-center">
            <Link href="#subscribe">
              <button className="btn-subscribe">SUBSCRIBE</button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <Link href="/createblog">
              <button className="btn-primary flex flex-row gap-2">
                <Image
                  src={Pen}
                  alt="userImage"
                  className="rounded-full w-6 h-6"
                />
                <div className="hidden md:inline">Write Blog</div>
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
