"use client";
import { useNav } from "../../context/nav_context";
// import { INavigationItems } from "@/lib/types/types";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";


const SidebarMenuItem = ({children, icon, tab, tabUrl}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { closeNav } = useNav();
  const toggleItem = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    children?.find((child) => pathname.startsWith(child.url)) &&
      setIsOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={` 
      ${
        children?.find((child) => pathname.startsWith(child.url)) ||
        (tabUrl && pathname.startsWith(tabUrl))
          ? "after:block"
          : "after:hidden"
      }
      `}
    >
      {!children && tabUrl ? (
        <Link
          href={tabUrl}
          onClick={closeNav}
          className={`${
            pathname.startsWith(tabUrl)
              ? "text-[#00ADEF] font-semibold bg-white"
              : "text-[#F5FCFF] font-light"
          } px-[5%] py-[14px] cursor-pointer flex items-center gap-[10px] pl-[calc(24px+5%)]`}
        >
          <Image src={icon} alt="" />
          <span>{tab}</span>
        </Link>
      ) : (
        <>
          <div
            onClick={toggleItem}
            className={`${
              children?.find((child) => pathname.startsWith(child.url))
                ? "text-primary font-semibold"
                : "text-gray-500 font-light"
            } px-[5%] py-[14px] cursor-pointer flex justify-between items-center`}
          >
            <div className="flex gap-[10px] pl-[24px]">
              <Image src={icon} alt="" />
              <span>{tab}</span>
            </div>
            {isOpen ? <ArrowUp2 size={"20px"} /> : <ArrowDown2 size={"20px"} />}
          </div>

          {isOpen && (
            <ul className="text-[11px] text-gray-500 font-light pl-1">
              {children?.map((child, index) => (
                <li
                  key={index}
                  className={`hover:bg-[#F3F4FB] flex w-full  font-light  ${
                    pathname.startsWith(child.url) ? "bg-[#F3F4FB]" : ""
                  }`}
                >
                  <Link
                    onClick={closeNav}
                    href={child.url}
                    className="pl-[calc(24px+15%)] px-6 p-2 w-full min-h-full"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default SidebarMenuItem;
