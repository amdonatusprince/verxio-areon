"use client";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { nanoid } from "nanoid";
import {
  useContractWrite,
} from "wagmi";
import { VerxioSubmitTaskABI } from "../../../components/abi/VerxioSubmitTask.json";

const Page = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [fileUrl, updateFileUrl] = useState(``);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [responsibilities, setResponsibilities] = useState();
  const [requirements, setRequirements] = useState();
  const [jobType, setJobType] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [totalPeople, setTotalPeople] = useState();
  const [amount, setAmount] = useState();
  const [fileDoc, setFileDoc] = useState();
  const taskID = nanoid();

  const {
    data: submitTaskData,
    isLoading: isSubmittingTask,
    isSuccess: isTaskSubmitted,
    write: submitTaskWrite,
    isError: isSubmittingTaskError,
  } = useContractWrite({
    address: "0x596661d498cb0ec4fde296fe318123834fc0dbbf",
    abi: VerxioSubmitTaskABI,
    functionName: "submitTask",
    args: [
      taskID,
      title,
      description,
      "fileDoc-url.com",
      totalPeople,
      amount,
      jobType,
      paymentMethod,
      responsibilities,
      requirements,
    ],
  });

  const handleSubmitTask = async (e) => {
    e.preventDefault();
  
    try {
      const transaction = submitTaskWrite(); 
      // Now you can perform additional submit logic, e.g., send data to the server
    } catch (error) {
      console.error("File Error:", error);
    }
  };

  return (
    <div className="border rounded-[8px] px-[90px] py-[50px]">
      <div className="border text-center w-full py-[65px] px-[94px] font-semibold text-[32px] rounded-lg bg-post-hero-img bg-no-repeat bg-cover  bg-[rgba(0,0,0,0.1)]">
        What{" "}
        <span className="text-[#00ADEF] border-b-[2px] border-[#00ADEF] italic">
          work call
        </span>{" "}
        do you have in mind today?
      </div>

      <form action="" onSubmit={handleSubmitTask}>
        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="title">Enter Task Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            className="border outline-none rounded-[4px] border-black p-2"
          />
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="description">Enter Task Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id=""
            cols="30"
            rows="10"
            name="description"
            className="border outline-none rounded-[4px] border-black p-2 max-h-[120px]"
          ></textarea>
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="responsibilities">Enter Task Responsibilities</label>

          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            id=""
            cols="30"
            rows="10"
            name="responsibilities"
            className="border outline-none rounded-[4px] border-black p-2 max-h-[120px]"
          ></textarea>
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="requirements">Enter Task Requirements</label>

          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            id=""
            cols="30"
            rows="10"
            name="requirements"
            className="border outline-none rounded-[4px] border-black p-2 max-h-[120px]"
          ></textarea>
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="jobType">Task Type</label>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            id="jobType"
            name="jobType"
            className="border outline-none rounded-[4px] border-black p-2"
          >
            <option value="">select task type</option>
            <option value="quest">Quest</option>
            <option value="bounty">Bounty</option>
            <option value="contract">Contract</option>
            <option value="fulltime">Full Time</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="paymentMethod">Payment Token</label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            id=""
            name="paymentMethod"
            className="border outline-none rounded-[4px] border-black p-2"
          >
            <option value="">select payment token eg. ICP</option>
            <option value="icp">ICP</option>
            <option value="etherum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="totalPeople">
            How many people are required for the task?
          </label>

          <input
            value={totalPeople}
            onChange={(e) => setTotalPeople(e.target.value)}
            type="number"
            name="totalPeople"
            className="border outline-none rounded-[4px] border-black p-2"
          />
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="amount">Enter payment amount</label>

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            id=""
            name="amount"
            className="border outline-none rounded-[4px] border-black p-2"
          />
        </div>

        <div className="flex flex-col gap-3 text-16 ">
          <label htmlFor="fileDoc">
            Upload file (doc, pdf, png, jpg, etc.)
          </label>
          <input
            value={fileDoc}
            onChange={(e) => setFileDoc(e.target.value)}
            name="fileDoc"
            className="border outline-none rounded-[4px] border-black p-2"
            type="file"
          />
        </div>

        <div>
          <Button type="submit" name="Submit Task" className="mt-8 w-full " />
        </div>

        <article className="mt-4 text-sm">
          {isSubmittingTask && <p> Submitting Task...</p>}

          {isSubmittingTaskError && <p>There is an Error in Submitting Task</p>}

          {isTaskSubmitted  && (
            <p>Task Submitted Successfully!</p>
          )}
        </article>
      </form>
    </div>
  );
};

export default Page;

