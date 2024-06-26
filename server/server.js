import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import videoRoutes from "./routes/video.js";
import signUploadRoutes from "./routes/sign-upload.js";
import { errorHandler } from "./middlewares/error.js";

dotenv.config();

// Express App
const app = express();
const port = process.env.PORT || 8002;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/videos", videoRoutes);
app.use("/api/sign-upload", signUploadRoutes);

app.use(errorHandler);

// Listen to the requests
app.listen(port, () => {
  // connect to DB
  connectDB();
  console.log("Server started listening on port", port);
});