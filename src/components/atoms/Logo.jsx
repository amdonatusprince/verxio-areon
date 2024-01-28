import Image from "next/image";
import SmeLogo from "../../assets/Logo.svg";
import { twMerge } from "tailwind-merge";

const Logo = ({ className }) => {
  return (
    <Image src={SmeLogo} alt="Verxio logo" className={twMerge(`w-full max-w-[66px]`, className)} />
  );
};

export default Logo;
