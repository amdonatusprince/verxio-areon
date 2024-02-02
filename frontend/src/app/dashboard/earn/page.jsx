"use client";

import JobCard from "../../../components/jobComponent/JobCard";
import { useEffect, useState,  React } from "react";
import { 
  useSimulateContract,
  useAccount,
  useReadContract,
  useContractRead
 } from 'wagmi'
 import {VerxioSubmitTaskABI} from "../../../components/abi/VerxioSubmitTask.json"
import { useNav } from "../../../context/nav_context";

const Page = () => {
  const {user} = useNav()
  const [jobs, setJobs] = useState([])


  const { data, isError, isLoading, refetch } = useContractRead({
    address: '0xa2a3b38f6088d729a1454bcd2863ce87b9953079',
    abi: VerxioSubmitTaskABI,
    functionName: 'getAllTasks'
  });

  console.log("Showing job results: ", data)


  return (
    <>
       <div className="border p-[32px] rounded-2xl">
        <h2 className="text-primary text-[28px] font-semibold mb-[32px] capitalize">
          Welcome back John
        </h2>
        {jobs.map((item) => (
          <JobCard key={item.key} jobs={item}/>
        ))}
      </div>
    </>
  );
};

export default Page;
