"use client";
import React from "react";
import { initJuno } from "@junobuild/core";
import { authSubscribe } from "@junobuild/core";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useEffect, useState } from "react";
import { Logo, SidebarMenuItem } from "./atoms";
import Image from "next/image";
import AxiosLogo from "../assets/AxiosLogo.svg";
import { useNav } from "../context/nav_context";
import { NavigationItems } from "../lib/data/sideBarData";

const Sidebar = () => {

  

  const { isOpen, toggleNav, user, setUser } = useNav();

  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "tw7oh-ryaaa-aaaal-adoya-cai",
      }))();
  }, []);

  authSubscribe((user) => {
    console.log("Authentication state changed:", user);
    if(user){
      const userObject = {
        owner: user.owner,
        key: user.key,
      };
      setUser(userObject);
    }
  });
  

  console.log("User Found", user)

  return (
    <>
      <nav
        className={`
      ${
        isOpen ? "translate-x-0 absolute h-full " : "max-lg:hidden"
      } w-[340px] bg-primary z-50 h-screen `}
      >
        <div className="border-b border-dashed flex justify-center items-center px-[5%]">
          <Logo className="py-12" />
        </div>

        <div className="flex justify-between flex-col h-[calc(100%-200px)] p-3 ">
          <ul className="">
            {NavigationItems.map((item, index) => (
              <SidebarMenuItem key={`sidebar-item-${index}`} {...item} />
              // <div></div>
            ))}
          </ul>

          {user ? <LogoutButton /> : <LoginButton />}

          <button className=" flex items-center  mx-auto w-[80%] gap-3">
            <p className="text-white text-[12px]">Powered by</p>
            <Image src={AxiosLogo} alt="Axios Logo" width={50} height={50} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
