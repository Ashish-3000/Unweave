import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const Menu = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div
          className="rounded-full w-[35px] h-[35px] 
          inline-flex items-center justify-center
           text-violet11 outline-none hover:bg-violet3
           focus:bg-violet4"
          aria-label="Customise options"
        >
          <HamburgerMenuIcon />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          style={{ zIndex: "1" }}
          className="w-screen flex items-center justify-center flex-col h-screen bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <Link href="/latest">
            <DropdownMenu.Item className="menu-button">
              Latest{" "}
            </DropdownMenu.Item>
          </Link>
          <Link href="/gadgets">
            <DropdownMenu.Item className="menu-button">
              Gadgets
            </DropdownMenu.Item>
          </Link>
          <Link href="/startup">
            <DropdownMenu.Item className="menu-button">
              Startup
            </DropdownMenu.Item>
          </Link>
          <Link href="/tags">
            <DropdownMenu.Item className="menu-button">Tags</DropdownMenu.Item>
          </Link>
          <Link href="/signin/#signin">
            <DropdownMenu.Item className="menu-button">
              Sign In
            </DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Menu;
