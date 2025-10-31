export const dynamic = 'force-dynamic';

import { canListUsers, listUsers } from "../../../../server/users";
import { DataTable } from "./partials/data-table";
import { columns } from "./partials/columns";
import NotFoundPage from "@/components/404";
import { CreateUserDialog } from "./partials/create-user-dialog";

export default async function ListUserPage() {
  const response = await listUsers();
  const hasPermission = await canListUsers();
  if (!hasPermission) {
    return <NotFoundPage />;
  }
  console.log(response.users);
  return (
    <div className="container mx-auto py-10" suppressHydrationWarning>
      <DataTable columns={columns} data={response.users} />
    </div>
  );
}
