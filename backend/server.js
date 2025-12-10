import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from './config/db.js';

import userRoutes from "./routes/userRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";

dotenv.config ();
connectDB();

const app = express();

// Enhanced CORS configuration to support localhost and live deployment
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "https://quickandquality.onrender.com",
    "https://www.quickandquality.onrender.com",
    "https://quickandquality.netlify.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => res.send("Quick And Quality API is running..."));

//Routes
app.get("/api", (req, res) => {
    res.json({ message: "Backend is connected to frontend!" });
});
app.use("/api/users", userRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Use Render's assigned port or default to 5000 for local dev
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});