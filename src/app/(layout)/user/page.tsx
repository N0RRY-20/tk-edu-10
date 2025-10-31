import { canListUsers, listUsers } from "../../../../server/users";
import { DataTable } from "./partials/data-table";
import { columns } from "./partials/columns";
import NotFoundPage from "@/components/404";

export default async function ListUserPage() {
  const response = await listUsers();
  const hasPermission = await canListUsers();
  if (!hasPermission) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={response.users} />
    </div>
  );
}
