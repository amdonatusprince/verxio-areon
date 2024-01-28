import React from "react";
import Button from "../../../components/Button";
import ProjectCard from "../../../components/projectCard";

const page = () => {
  const data = [
    {
      id: 1,
      label: " DynamicWebX  Responsive Frontend Development Project ",
      time: "jan 7, 2024",
      desc: "The Developer agrees to provide the Client with front-end development services for the creation of a dynamic and responsive website, referred to as (DynamicWebX). The website will incorporate modern design principles and ensure optimal user experience across various devices..",
      name: "charles",
    },
    {
      id: 2,
      label: " DynamicWebX  Responsive Frontend Development Project ",
      time: "jan 7, 2024",
      desc: "The Developer agrees to provide the Client with front-end development services for the creation of a dynamic and responsive website, referred to as (DynamicWebX). The website will incorporate modern design principles and ensure optimal user experience across various devices..",
      name: "David",
    },
    {
      id: 3,
      label: " DynamicWebX  Responsive Frontend Development Project ",
      time: "jan 7, 2024",
      name: "John",
      desc: "The Developer agrees to provide the Client with front-end development services for the creation of a dynamic and responsive website, referred to as (DynamicWebX). The website will incorporate modern design principles and ensure optimal user experience across various devices..",
    },
  ];
  return (
    <div className="border p-[32px] rounded-2xl">
      <h2 className="text-primary text-[28px] font-semibold capitalize mb-9">
        Project Contract
      </h2>

      {data.map((item) => (
        <div key={item.id} className="mb-[32px]">
          <ProjectCard item={item} />
        </div>
      ))}

      {/* <Button name="chat charles" icon={chat} className="mt-[32px]" /> */}
    </div>
  );
};

export default page;
