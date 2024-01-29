import mongoose from "mongoose";
import "dotenv/config";
import { app } from "./app.js";

const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb);

const connectToDatabase = async () => {
  try {
    await connection;
    console.log("Database connection successful.");
  } catch {
    console.log("You can't connect to database. Please try again.");
    process.exit(1);
  }
}

export const server = async () => {
  const PORT = process.env.PORT || 3000;
  await connectToDatabase();
  try {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`)
  }
};

server();

