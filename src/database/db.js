import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export const connectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
});

if (process.env.MODE === "prod") connectionDB.ssl = true;

export const db = new Pool(connectionDB);
