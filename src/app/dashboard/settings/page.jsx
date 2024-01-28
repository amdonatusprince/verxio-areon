"use client";
import { useContext, useEffect, useState,  React, useRef } from "react";
import { authSubscribe, listDocs } from "@junobuild/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/Button";
import Edit from "../../../assets/edit.svg";
import * as Yup from "yup";
import { uploadFile, setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";

const Page = () => {
  const [user, setUser] = useState();
  const [userDetailHistory, setuserDetailHistory] = useState([])
  const [userProfile, setuserProfile] = useState()
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = authSubscribe((newUser) => {
      setUser(newUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const list = async () => {
    try {
      const { items } = await listDocs({
        collection: "userProfile-details",
      });
      setuserDetailHistory(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      list();
    }
  }, [user]);

  const lastUserDetails = userDetailHistory[0];
  let userProfileDetails;
// Check if the object is not null or undefined
  if (typeof lastUserDetails === 'object') {
        userProfileDetails = {
        ...lastUserDetails.data,
        owner: lastUserDetails.owner 
    };
    } 
  
  console.log("User Profile", userProfileDetails);

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

  const initialValues = {
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    phoneNumber: "",
    website: "",
    fileDoc: "",
    profileImageDoc: "",
  };

  const validationchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    bio: Yup.string().required("Bio is required"),
    email: Yup.string().required("Email is required"),
    phoneNumber: Yup.number("value must be a number").required(
      "Please input number"
    ),
    fileDoc: Yup.string().required("Please upload necessary doc"),
  });

  const submitValue = async (values) => {
      {
      console.log("Image Profile: ", selectedImage)
      console.log("Form values:", values);
      console.log("Uploading Files...");
      let url; 
      let ImageUrl;
      try {
        // Handle file upload logic
        if (values.fileDoc !== undefined) {
          const filename = `${user.key}-${values.fileDoc.name}`;
          const { downloadUrl } = await uploadFile({
            collection: "userProfile-document",
            data: values.fileDoc,
            filename,
          });
          url = downloadUrl;
        }

        if (profileImageDoc !== undefined) {
          const filename = `${user.key}-${profileImageDoc.name}`;
          const { downloadUrl } = await uploadFile({
            collection: "userProfile-photo",
            data: profileImageDoc,
            filename,
          });
          ImageUrl = downloadUrl;
        }

        // Access the download URL and other form values here
          console.log("Stored on the Juno Storage...");
          console.log("Download URL:", url);

        await setDoc({
          collection: "userProfile-details",
          doc: {
            key: nanoid(),
            data: {
            firstName: values.firstName,
            lastName: values.lastName,
            bio: values.bio,
            email: values.email,
            phoneNumber: values.phoneNumber,
            website: values.website,
            fileDoc: url,
            profileImageDoc: ImageUrl
            },
          },
        });

        console.log("Profile upload successful!...");

        // Now you can perform additional submit logic, e.g., send data to the server
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }
  };



  return (
    <>
      <div className="flex relative justify-center">
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
      <div className=" px-[90px] py-[50px]">
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validationSchema={validationchema}
        >
          {({ isValid, handleSubmit, values, dirty, setFieldValue }) => (
            <Form className="mt-8 flex flex-col gap-5 w-[80%] ">
              <div className="flex flex-col gap-3 text-16 ">
                <label htmlFor="firstName">First Name</label>
                <Field
                  name="firstName"
                  placeholder="John"
                  className="border outline-none rounded-[4px] border-black p-2"
                />
                <ErrorMessage name="firstName" component={Error} />
              </div>
              <div className="flex flex-col gap-3 text-16 ">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  placeholder="Doe"
                  name="lastName"
                  className="border outline-none rounded-[4px] border-black p-2"
                />
                <ErrorMessage name="lastName" component={Error} />
              </div>

              <div className="flex flex-col gap-3 text-16 ">
                <label htmlFor="bio">Bio</label>
                <Field
                  placeholder="Tell us about you"
                  name="bio"
                  as="textarea"
                  className="border outline-none rounded-[4px] border-black p-2 max-h-[90px]"
                />
              </div>

              <div className="flex flex-col gap-3 text-16 ">
                <label htmlFor="email">Contact Email</label>
                <Field
                  placeholder="johndoe@gmail.com"
                  name="email"
                  className="border outline-none rounded-[4px] border-black p-2"
                />
                <ErrorMessage name="email" component={Error} />
              </div>

              <div className="flex flex-col gap-3 text-16 ">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  placeholder="123-456-7890"
                  name="phoneNumber"
                  className="border outline-none rounded-[4px] border-black p-2"
                />
                <ErrorMessage name="phoneNumber" component={Error} />
              </div>
              <div className="flex flex-col gap-3 text-16 ">
                <label htmlFor="website">Website</label>
                <Field
                  placeholder="www.insertyourlink.com"
                  name="website"
                  className="border outline-none rounded-[4px] border-black p-2"
                />
                <ErrorMessage name="website" component={Error} />
              </div>

              <div className="flex flex-col gap-3 text-16 ">
                <label htmlFor="fileDoc">
                  Upload file (doc, pdf, png, jpg, etc.)
                </label>
                <input
                  name="fileDoc"
                  className="border outline-none rounded-[4px] border-black p-2"
                  type="file"
                  onChange={(event) =>
                    setFieldValue("fileDoc", event.currentTarget.files[0])
                  }
                />
                <ErrorMessage name="fileDoc" component={Error} />
              </div>
              <div>
                <Button
                  type="submit"
                  name="Update Profile"
                  className="mt-8 w-full "
                  onClick={() => {
                    if (isValid && dirty) {
                      // console.log(values);
                      submitValue(values);
                    }
                  }}
                />
                {/* <LoadingButton
                type="submit"
                variant="contained"
                // color="primary"
                className="mt-8 w-full"
                loading={loading}
                onClick={() => {
                  if (isValid && dirty) {
                    submitValue(values);
                    setLoading(true);
                  }
                }}
                >
                Submit
              </LoadingButton> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Page;

const Error = ({ children }) => {
  return <p className="text-red-400  text-[12px] mt-[-5px]">{children}</p>;
};
