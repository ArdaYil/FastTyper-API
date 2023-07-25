import mongoose from "mongoose";
import config from "config";

const db = () => {
  const uri = config.get<string>("db");
  mongoose
    .connect(uri)
    .then(() => console.log(`Successfully connected to ${uri}`))
    .catch(() => console.log(`Failed to connect to ${uri}`));
};

export default db;
