import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const connectionDB = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "prod") connectionDB.ssl = true;

const db = new Pool(connectionDB);

export default db;
