import type { DB } from "./types.ts"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    // プライベートサブネットでの通信を想定しているためfalseにする
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
