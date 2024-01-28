"use client";
import { useNav } from "../../context/nav_context";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Hamburger = () => {
  const { isOpen, toggleNav } = useNav();
  return (
    <div className="text-xl flex place-content-center bg-secondary-grey-600 place-items-center lg:hidden z-50  rounded-full cursor-pointer w-12 h-12 p-3 active:bg-gray-800">
      {isOpen ? (
        <AiOutlineClose onClick={toggleNav} />
      ) : (
        <AiOutlineMenu onClick={toggleNav} />
      )}
    </div>
  );
};

export default Hamburger;
