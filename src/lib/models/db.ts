import type { DB } from "./types.ts"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("localhost")
      ? false
      : {
          rejectUnauthorized: false,
        },
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
