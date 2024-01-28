import React from "react";

const SubmissionCard = ({ item , selectUser, ischecked}) => {
  const { name, role, date, desc } = item;
  return (
    <div className="flex align-top gap-4 border rounded-2xl p-7 bg-[#F7F7FD] mb-6">
      <div>
        <div className="border w-[89px] h-[89px] bg-gray-600 rounded-full"></div>
      </div>
      <div>
        <div className="flex justify-between">
          <div>
            <p className="text-[20px] font-bold text-[#18181B]">{name}</p>
            <p className="text-[16px] font-normal text-[#484851]">{role}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p>{date}</p>
            <input type="checkbox" className="w-9" checked={ischecked}  onChange={()=> selectUser(item)}/>
          </div>
        </div>
        <p className="text-[#484851] mt-3 mb-5">{desc}</p>
        <div className="flex gap-8">
          <button className="px-4 py-3 shadow-md bg-white rounded-[8px] italic">
            My resume
          </button>
          <button className="px-4 py-3 shadow-md bg-white rounded-[8px] italic">
            My portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
