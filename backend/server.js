import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from './config/db.js';

import userRoutes from "./routes/userRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

dotenv.config ();
connectDB();

const app = express();
app.use(cors());
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));