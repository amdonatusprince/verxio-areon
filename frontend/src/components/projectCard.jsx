import React from "react";
import Button from "./Button";
import chat from "../assets/comment-white.svg"


const ProjectCard = ({ item }) => {
  const { label, time, desc, name } = item;
  return (
    <>
      <div className="border bg-[#F7F7FD] rounded-2xl px-[32px] py-[28px] ">
        <div className="flex justify-between mb-[24px] ">
          <div>
            <p className="text-[20px] font-bold mb-2">
              {label}
            </p>
            <p className="text-[16px] font-medium">
              This agreement was entered into on [{time}]
            </p>
          </div>
          <Button
            name="ongoing"
            className="h-[32px] bg-[#DFF7DF] text-[#23C633] "
          />
        </div>
        <p className="text-[16px] text-[#5F6A61]">{desc}</p>
      </div>
      <Button name={`chart ${name}`} icon={chat} className="mt-[32px]" />
    </>
  );
};

export default ProjectCard;
