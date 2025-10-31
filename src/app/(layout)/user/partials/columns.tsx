"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "better-auth";
import { UserWithRole } from "better-auth/plugins";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "name",
    header: "nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
