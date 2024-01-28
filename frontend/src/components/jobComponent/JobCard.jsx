"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Thumbsup from "../../assets/thumbs-up.svg";
import Thumbsdown from "../../assets/thumbs-down.svg";
import Comment from "../../assets/comment.svg";
import Ethereum from "../../assets/ethereum.svg";
import ICP from "../../assets/icp-logo.svg";
import Solana from "../../assets/solana-logo.svg";
import Button from "../Button";
import { setJobDetails } from "../../../slices/jobSlice";
import Link from "next/link";
import { listDocs } from "@junobuild/core";
import { authSubscribe } from "@junobuild/core";
import { useNav } from "../../context/nav_context";
import { useSelector, useDispatch } from "react-redux";

const JobCard = ({ jobs }) => {
  // console.log(jobs);
  // const { setJobDetails} = useNav();

  const dispatch = useDispatch();
  
  // const jobDetailss = useSelector(
  //   (state) => state.persistedReducer.jobValues.jobDetails
  // );

  // console.log(jobDetailss)

  const { data } = jobs;
  console.log("Data", data)

  const logo = (coin) => {
    if (coin === "icp") {
      return ICP;
    } else if (coin === "etherum") {
      return Ethereum;
    } else if (coin === "solana") {
      return Solana;
    }
    // return null
  };

  return (
    <div className="bg-[#FFFFFF] px-[32px] py-[24px] rounded-2xl shadow mb-[34px]">
      <div className=" rounded-2xl bg-[#F7F7FD] p-[18px] cursor-pointer flex justify-between border">
        <div className=" flex gap-4">
          <div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8 aspect-square object-cover rounded-full border" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#020202] text-[18px] font-semibold capitalize">
              {/* Trail Bitz Company */}
              {data?.title}
            </p>
            <p className="font-normal text-[14px] text-[#424242]">
              {data?.title}/{data.jobType}/ Lagos.
            </p>
            <p className="text-[#484851] font-normal text-[16px] truncate ... max-w-[400px]">
              {/* {responsibilities} */}
              {data?.description}
            </p>
          </div>
        </div>
        <p className="text-[#0B0B28] text-[16px] font-semibold capitalize">
          open
        </p>
      </div>
      <div className="flex justify-between mt-[22px] items-center">
        <div className=" flex gap-[24px] items-center">
          <div className="flex border rounded-lg px-4 py-2 border-[#B6B8EC] items-center">
            <div className="flex gap-1 items-center border-r pr-2 mr-2">
              <Image alt="like it" src={Thumbsup} className="cursor-pointer" />
              <p className="text-[12px]">1.2k</p>
            </div>
            <Image
              alt="dislike it"
              src={Thumbsdown}
              className="cursor-pointer"
            />
          </div>
          <div className="border rounded-lg px-4 py-[9px] border-[#B6B8EC] flex gap-2 items-center">
            <Image
              alt="comment on it"
              src={Comment}
              className="cursor-pointer"
            />
            <p className="text-[12px]">201</p>
          </div>
        </div>
        <div className="flex gap-[24px] items-center">
          <div className="flex border rounded-lg px-4 py-2 border-[#B6B8EC] items-center">
            <p className="text-[14px] font-medium">{data?.amount}</p>
            <span className="text-[8px] mr-1">$300</span>
            <Image
              alt="Ethereum"
              src={logo(data.paymentMethod)}
              className="w-[18px]"
            />
          </div>
          <Button
            href="/dashboard/earn/job-description"
            onClick={() => dispatch(setJobDetails(data))}
            outline
            name="Apply"
            className="text-[#00ADEF]"
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
