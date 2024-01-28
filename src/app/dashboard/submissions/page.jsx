"use client";
import React, { useState } from "react";
import Button from "../../../components/Button";
import SubmissionCard from "../../../components/submissionCard";

const Page = () => {
  const [assignees, setAssignees] = useState([]);

  const [isCheckeds, setIscheckeds] = useState(false);
  const data = [
    {
      id: 1,
      name: "Kenechukwu Ikejiani",
      role: "Frontend Engineer",
      date: "Jan, 17",
      desc: "As a frontend engineer, you will collaborate with cross-functional teams to translate design concepts into... responsive and interactive web applications. If you are passionate about creating clean, efficient, and visually appealing interfaces.",
    },
    {
      id: 2,
      name: "Kenechukwu Ikejiani",
      role: "Frontend Engineer",
      date: "Jan, 17",
      desc: "As a frontend engineer, you will collaborate with cross-functional teams to translate design concepts into... responsive and interactive web applications. If you are passionate about creating clean, efficient, and visually appealing interfaces.",
    },
    {
      id: 3,
      name: "Kenechukwu Ikejiani",
      role: "Frontend Engineer",
      date: "Jan, 17",
      desc: "As a frontend engineer, you will collaborate with cross-functional teams to translate design concepts into... responsive and interactive web applications. If you are passionate about creating clean, efficient, and visually appealing interfaces.",
    },
  ];

  const selectUser = (item) => {
    setIscheckeds(!isCheckeds);

    const existingitem = assignees.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingitem !== -1) {
      assignees.splice(existingitem, 1);
    } else {
      setAssignees([...assignees, item]);
    }
  };

  console.log("assignees", assignees);

  return (
    <div className="border rounded-lg px-[41px] py-[37px]">
      <div className="flex justify-between mb-9 ">
        <h2 className="text-primary text-[28px] font-semibold capitalize">
          Submissions
        </h2>
        <Button outline name="assign" />
      </div>

      {data.map((item) => (
        <SubmissionCard
          key={item.id}
          item={item}
          selectUser={selectUser}
          isChecked={isCheckeds}
        />
      ))}
    </div>
  );
};

export default Page;
