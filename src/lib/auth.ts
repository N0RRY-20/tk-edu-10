import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { admin as adminPlugin } from "better-auth/plugins";
import { admin, guru, walimurid, ac } from "./permissions";
import * as schema from "@/db/schema/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  trustedOrigins: [
    "http://localhost:3000",
    "https://tk-edu-10.vercel.app",
    "*.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        guru,
        walimurid,
      },
    }),
    nextCookies(),
  ],
});
