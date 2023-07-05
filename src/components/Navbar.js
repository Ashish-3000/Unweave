"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

function Navbar() {
  return (
    <div className="hidden md:flex md:flex-row">
      <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
        <NavigationMenu.List className="center shadow-blackA7 m-0 flex list-none rounded-[6px] p-1 ">
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-violet11 hover:underline text-xl block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none "
              href="/latest"
            >
              Latest
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-violet11 hover:underline text-xl block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none "
              href="/gadgets"
            >
              Gadgets
            </NavigationMenu.Link>
          </NavigationMenu.Item>{" "}
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-violet11 hover:underline text-xl block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none "
              href="/startup"
            >
              Startup
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-violet11 hover:underline text-xl block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none "
              href="/tags"
            >
              Tags
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  );
}

export default Navbar;
