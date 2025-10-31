export const dynamic = "force-dynamic";

import { authClient } from "@/lib/auth-client";
import { DataTable } from "./partials/data-table";
import { columns } from "./partials/columns";
import { headers } from "next/headers";
import { UserWithRole } from "better-auth/plugins";

export default async function ListUserPage() {
  let users: UserWithRole[] = [];

  try {
    const requestHeaders = await headers(); // ❌ tidak pakai await

    const response = await authClient.admin.listUsers({
      query: {
        limit: 100,
        offset: 0,
        sortBy: "name",
        sortDirection: "desc",
      },
      fetchOptions: {
        headers: requestHeaders, // ✅ kirim headers
      },
    });

    users = response.data?.users ?? []; // ✅ simpan hasilnya
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container mx-auto py-10" suppressHydrationWarning>
      <DataTable columns={columns} data={users ?? []} />
    </div>
  );
}
