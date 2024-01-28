
import React from "react";
import { signOut } from "@junobuild/core";
import Image from "next/image";
import SignOut from "../assets/SignOut.svg";

const LogoutButton = () => {

  return (
  <button onClick={signOut}  className=" flex items-center  mx-auto w-[70%] gap-3">
    <Image src={SignOut} alt="" />
    <p className="text-white">Logout</p>
  </button>
  );
};

export default LogoutButton;  
