"use server";
import baseUrl from "../utils/baseUrl";
import { formDataToObject } from "../utils/formUtils";
import { getError } from "../utils/getError";

export const signUp = async (formData) => {
  try {
    const form = formDataToObject(formData);
    const response = await baseUrl.post("/users", form);
    const { message } = response.data;
    return { success: true, message };
  } catch (error) {
    let err = getError(error);
    return { error: err, success: false };
  }
};

export const login = async (formData) => {
  try {
    const response = await baseUrl.post("/users/login", formData);
    const user = response.data;
    return { user, success: true };
  } catch (error) {
    //("error @signIn line 24", { error });
    let err = getError(error);
    //("error @signIn line 26", { err });
    return { error: err, success: false };
  }
};

export const forgotPassword = async (formData) => {
  try {
    const response = await baseUrl.post("/users/forgotPassword", formData);
    const { message } = response.data;
    return { success: true, message };
  } catch (error) {
    // (error);
    let err = getError(error);
    return { error: err, success: false };
  }
};

export const resetPassword = async ({
  password,
  token,
}) => {
  try {
    const response = await baseUrl.put(`/users/resetPassword?token=${token}`, {
      password,
    });
    // ({response})
    const { message } = response.data;
    return { success: true, message };
  } catch (error) {
    let err = getError(error);
    return { error: err, success: false };
  }
};
