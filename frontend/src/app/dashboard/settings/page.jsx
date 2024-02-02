"use client";
import { useState, React, useRef } from "react";
import { useNav } from "../../../context/nav_context";
import Button from "../../../components/Button";
import Edit from "../../../assets/edit.svg";
import Image from "next/image";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { VerxioUserProfileABI } from "../../../components/abi/VerxioUserProfile.json";
import { getAccount } from "@wagmi/core";
import { faker } from '@faker-js/faker';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [userBIO, setUserBIO] = useState("");


  const user = getAccount();
  const userAddress = user.address;
  const { userProfileDetail, setUserProfileDetail } = useNav();

  // Gets UserProfile
  const { data: userProfile } = useContractRead({
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

  setUserProfileDetail(userProfile)



  // Updates UserProfile
  const { config } = usePrepareContractWrite({
    address: "0x4838854e5150e4345fb4ae837e9fcca40d51f3fe",
    abi: VerxioUserProfileABI,
    functionName: "updateProfile",
    args: [
      firstName,
      lastName,
      phoneNumber,
      userEmail,
      websiteURL,
      profileURL,
      "document-testurl.com",
      userBIO,
    ],
  });

  const {
    data: updateProfileData,
    isLoading: isUpdatingProfile,
    isSuccess: isProfileUpdated,
    write: updateProfileWrite,
    isError: isUpdatingProfileError,
  } = useContractWrite(config);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();


    {
      console.log("Uploading Files...");
      try {

        const imageUrl = faker.image.urlLoremFlickr({ 
          category: 'person'
        })
        setProfileURL(imageUrl)
        const transaction = updateProfileWrite();
        // Additional logic after the transaction is submitted
        console.log("Transaction submitted:", transaction);
        console.log("Task upload successful!...", updateProfileData);
        console.log("Profile upload successful!...");

        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setUserEmail("");
        setUserBIO("");
        setWebsiteURL("");

        // Now you can perform additional submit logic, e.g., send data to the server
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }
  };

  return (
    <>
      <div>
        <form
          className="mt-8 flex flex-col gap-5 w-[80%] "
          onSubmit={handleUpdateProfile}
        >
          <div className="flex relative justify-center -mt-24 mb-14">
            <div className="w-[200px] h-[200px] bg-slate-500  border-[8px] border-white rounded-full absolute -top-[100px]">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="profile picture"
                  width={200}
                  height={200}
                  className="w-full h-full rounded-full bg-cover"
                />
              )}
              <div
                className="bg-white p-[10px] rounded-full z-20 absolute -right-2 shadow-md top-[124px] cursor-pointer "
                onClick={handleUploadButtonClick}
              >
                <Image src={Edit} alt="Edit image" className=" w-6" />
              </div>
            </div>
            <input
              name="profileImageDoc"
              type="file"
              capture="environment"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="firstName">First Name</label>

            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="firstName"
              placeholder="John"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>
          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="lastName">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Doe"
              name="lastName"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>

          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="bio">User Bio</label>
            <textarea
              value={userBIO}
              onChange={(e) => setUserBIO(e.target.value)}
              id="bio"
              cols="30"
              rows="10"
              placeholder="Tell us about you"
              name="bio"
              className="border outline-none rounded-[4px] border-black p-2 max-h-[90px]"
            ></textarea>
          </div>

          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="email">Contact Email</label>
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="text"
              placeholder="johndoe@gmail.com"
              name="email"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>

          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="123-456-7890"
              name="phoneNumber"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>
          <div className="flex flex-col gap-3 text-16 ">
            <label htmlFor="website">Website</label>
            <input
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
              type="text"
              placeholder="www.insertyourlink.com"
              name="website"
              className="border outline-none rounded-[4px] border-black p-2"
            />
          </div>


          <div>
            <Button
              type="submit"
              name="Update Profile"
              className="mt-8 w-full "
            />
          </div>

          <article className="mt-4 text-sm">
            {isUpdatingProfile && <p> Updating Profile...</p>}

            {isUpdatingProfileError && (
              <p>There is an Error in Updating Profile</p>
            )}

            {isProfileUpdated && <p>Profile Updated...</p>}
          </article>
        </form>
      </div>
    </>
  );
};

export default Page;