/**import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// API Routes
import register from "./api/register.js";
import login from "./api/login.js";

app.use("/api/register", register);
app.use("/api/login", login);

// Create Users Table (if not exists)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    otp VARCHAR(6)
  );
`;

pool.query(createTableQuery)
  .then(() => console.log("Users table is ready"))
  .catch((err) => console.error("Error creating table", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/