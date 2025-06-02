import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./lib/DB.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});


