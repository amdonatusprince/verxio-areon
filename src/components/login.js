
import React from "react";
import { signIn } from "@junobuild/core";
import Image from "next/image";
import SignOut from "../assets/SignOut.svg";

const LoginButton = () => {

  return (
    <button onClick={signIn} className="flex items-center mx-auto w-[70%] gap-3">
      <Image src={SignOut} alt="" />
      <p className="text-white">Login</p>
    </button>
  );
};

export default LoginButton;  
