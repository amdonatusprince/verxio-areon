import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

const Button = ({
  href,
  small,
  large,
  className,
  scroll = true,
  outline,
  name,
  onClick,
  icon,
  type,
  ...props
}) => {
  return href ? (
    <Link
      scroll={scroll}
      onClick={onClick}
      className={twMerge(
        `${
          outline
            ? "bg-[transparent] text-[#00ADEF] border border-[#00ADEF]"
            : "bg-[#00ADEF] text-[#FCFCFC]"
        } rounded-[8px] transition-all leading-none duration-500 text-[14px] font-medium ${
          !props.disabled ? "hover:scale-[1.02] active:scale-[0.95]" : ""
        }  min-w-fit
      flex items-center place-items-center justify-center gap-4 px-[18px] py-2 capitalize`,
        className
      )}
      href={href}
    >
      {name}
    </Link>
  ) : (
    <button
      type={type}
      {...props}
      className={twMerge(
        `${
          outline
            ? "bg-[transparent] text-[#00ADEF] border border-[#00ADEF]"
            : "bg-[#00ADEF] text-[#FCFCFC]"
        } rounded-[8px] transition-all leading-none duration-500 text-[14px] font-medium ${
          !props.disabled ? "hover:scale-[1.02] active:scale-[0.95]" : ""
        }  min-w-fit
      flex items-center place-items-cente justify-center gap-2 px-[18px] py-2 capitalize`,
        className
      )}
      onClick={onClick}
    >
      {name}
      {icon && <Image src={icon} className="w-4" alt="icon" />}
    </button>
  );
};

export default Button;
