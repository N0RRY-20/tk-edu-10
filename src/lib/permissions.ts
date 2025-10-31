import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  user: ["create", "share", "update", "delete", "list"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  user: ["create", "list"],
});
export const guru = ac.newRole({
  user: ["create", "update"],
});
export const walimurid = ac.newRole({
  user: ["create", "update", "delete"],
});
