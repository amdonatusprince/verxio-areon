"use client";

import JobCard from "../../../components/jobComponent/JobCard";
import { useContext, useEffect, useState,  React } from "react";
import { listDocs } from "@junobuild/core";
import { authSubscribe } from "@junobuild/core";

import { AuthContext } from "../../../components/auth";
import { useNav } from "../../../context/nav_context";

const Page = () => {
  // const { user } = useContext(AuthContext);

  // const {user} = useNav()
  // const [items, setItems] = useState([]);

  // console.log(user)

  // const {jobDetails, setJobDetails} = useNav()
  const [jobs, setJobs] = useState([])
  
  const [user, setUser] = useState();

  const list = async () => {
    try {
      const { items } = await listDocs({
        collection: "publish-task",
      });
      setJobs(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = authSubscribe((newUser) => {
      setUser(newUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      list();
    }
  }, [user]);

  // console.log("List of document: ", jobs);

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
