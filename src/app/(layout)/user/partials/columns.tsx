"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { UserWithRole } from "better-auth/plugins";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    cell: ({ row }) => {
      const rawRole = row.getValue("role") as string | undefined;
      const roles: string[] = rawRole ? rawRole.split(",") : [];

      return (
        <div className="flex gap-1">
          {roles.map((role) => (
            <Badge variant="secondary" key={role}>
              {capitalize(role)}{" "}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                // Dapatkan user saat ini
                const currentUser = await authClient.getSession();

                if (currentUser?.data?.user?.id === payment.id) {
                  console.error("Tidak dapat menghapus diri sendiri");
                  return;
                }

                const { data: deletedUser, error } =
                  await authClient.admin.removeUser({
                    userId: payment.id,
                  });

                if (error) {
                  console.error("Failed to delete user:", error);
                } else {
                  console.log("User deleted:", deletedUser);
                  // Refresh data atau update UI
                }
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
