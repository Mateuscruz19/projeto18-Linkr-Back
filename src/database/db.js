import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const connectionDB = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "prod") connectionDB.ssl = true;

console.log(process.env.DATABASE_URL);

const db = new Pool(connectionDB);

export default db;
