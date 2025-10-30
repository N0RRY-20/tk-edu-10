"use server";

import { auth } from "@/lib/auth";

export const signUpEmail = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name, // required
        email, // required
        password, // required
      },
    });
    if (result) {
      return {
        success: true,
        message: "Sign up email success",
      };
    }
  } catch (error) {
    const err = error as Error;
    console.log(err);
    return {
      success: false,
      message: err?.message || "Sign up email failed",
    };
  }
};
