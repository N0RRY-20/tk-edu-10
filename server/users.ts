// server/users.ts

import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export const canListUsers = async () => {
  const { data, error } = await authClient.admin.hasPermission({
    permissions: {
      user: ["list"],
    },
    fetchOptions: {
      headers: await headers(),
    },
  });
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  return data?.success;
};

type Role = "admin" | "guru" | "walimurid";
export const CreateUser = async (
  role: Role,
  email: string,
  password: string,
  name: string
) => {
  try {
    const { data: newUser, error } = await authClient.admin.createUser({
      email, // required
      password, // required
      name, // required
      role,
      // data: { customField: "customValue" },
    });
    if (error) {
      throw new Error(error.message);
    }
    return newUser.user;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};
