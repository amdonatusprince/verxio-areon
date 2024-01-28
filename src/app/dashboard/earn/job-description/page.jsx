// import JobCard from '@/components/jobComponent/JobCard';
import JobDescription from '../../../../components/jobComponent/jobDescription';
import React from 'react'

const page = () => {
  return (
    <div className="border p-[32px] rounded-2xl relativ ">
      <h2 className="text-primary text-[28px] font-semibold mb-[32px] capitalize">
        Welcome back John
      </h2>
      {/* {item.map((item) => ( */}
        <JobDescription/>
      {/* ))} */}
    </div>
  );
}

export default page