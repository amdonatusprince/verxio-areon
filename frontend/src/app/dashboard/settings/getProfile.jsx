import React, { useState } from "react";
import { useContractRead } from "wagmi";
import { VerxioUserProfileABI } from "../../../components/abi/VerxioUserProfile.json";
import { getAccount } from "@wagmi/core";

const GetProfile = () => {
  const user = getAccount();
  const userAddress = user.address;

  console.log("User Info: ", userAddress);

  const {
    data: getProfileData,
    isError: isGettingProfileError,
    isLoading: isGettingProfile,
  } = useContractRead({
    address: "0x4838854e5150e4345fb4ae837e9fcca40d51f3fe",
    abi: VerxioUserProfileABI,
    functionName: "getProfile",
    args: [userAddress],
    watch: true,
    onSuccess(data) {
      console.log("Success: UserProfile", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <div>
      <p>Name: {String(getProfileData)} </p>
      {isGettingProfileError && (
        <p className="text-sm font-normal">
          Error getting Profile, <br />
          Please Check if wallet is connected
        </p>
      )}
      {isGettingProfile && <p>Getting Profile....</p>}
    </div>
  );
};

export default GetProfile;
