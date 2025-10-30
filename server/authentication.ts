"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
    throw new Error(err.message);
  }
};

export const signInEmail = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email, // required
        password, // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    if (result) {
      return {
        success: true,
        message: "Sign in email success",
      };
    }
  } catch (error) {
    const err = error as Error;
    console.log(err);
    throw new Error(err.message);
  }
};
