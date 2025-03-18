import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import fileRoute from "./routes/fileRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors(
    {
        origin: "https://journal-upload.vercel.app",
        credentials: true
    }
));
app.use(cookieParser());

// Connect Database
connectDB();

// Routes
app.use("/api/files", fileRoute);
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running..."));

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
