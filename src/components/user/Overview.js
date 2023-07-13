"use client";
import React from "react";
import Image from "next/image";
import Exploring from "../../../public/exploring.png";
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";
import {
  LinkedInLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
  VercelLogoIcon,
} from "@radix-ui/react-icons";
import { isAuthenticated, isAuthorised } from "../../helper/authentication";

function Overview({ setSelected, author, user }) {
  let twitter = "";
  let github = "";
  let mysite = "";
  let linkedin = "";
  if (user.links !== undefined && user.links[0] !== undefined) {
    const links = user.links[0];
    twitter = links.twitter;
    github = links.github;
    mysite = links.mysite;
    linkedin = links.linkedin;
  }

  return (
    <div className="relative mx-auto w-4/5">
      <div className=" px-4 pt-6 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center pb-10">
        <Image
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src={user?.photo ? user.photo : Exploring}
          alt="Bonnie image"
          width="100"
          height="100"
        />
        <p className="mb-1 text-xl font-medium text-gray-900 ">
          {user.penname}
        </p>
        <p className="mb-1 text-sm font-medium text-gray-900 ">{user.name}</p>
        <div className="mt-3 flex w-3/4 mx-auto justify-center gap-4">
          {twitter !== "" && (
            <Link href={twitter}>
              <TwitterLogoIcon className="h-6 w-6" />
            </Link>
          )}
          {github !== "" && (
            <Link href={github}>
              <GitHubLogoIcon className="h-6 w-6" />
            </Link>
          )}
          {linkedin !== "" && (
            <Link href={linkedin}>
              <LinkedInLogoIcon className="h-6 w-6" />
            </Link>
          )}
          {mysite !== "" && (
            <Link href={mysite}>
              <VercelLogoIcon className="h-6 w-6" />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-8 bg-blue">
        <div>
          <Separator.Root className="w-full h-[0.1rem] bg-black my-4" />
          <div
            onClick={() => {
              setSelected(0);
            }}
            style={{ display: isAuthorised(author) ? "block" : "none" }}
          >
            {isAuthenticated() && isAuthorised(author) && (
              <p className=" cursor-pointer hover:bg-gray-200"> Edit Profile</p>
            )}
            <Separator.Root className="w-full h-[0.1rem] bg-black my-4" />
          </div>
          <div
            onClick={() => {
              setSelected(1);
            }}
            style={{ display: isAuthorised(author) ? "block" : "none" }}
          >
            {isAuthenticated() && isAuthorised(author) && (
              <p className=" cursor-pointer hover:bg-gray-200">Saved Blogs</p>
            )}
            <Separator.Root className="w-full h-[0.1rem] bg-black my-4" />
          </div>
          <div
            className="= cursor-pointer hover:bg-gray-200"
            onClick={() => {
              setSelected(2);
            }}
          >
            Published Blogs
          </div>
          <Separator.Root className="w-full h-[0.1rem] bg-black my-4" />
        </div>
      </div>
    </div>
  );
}

export default Overview;
