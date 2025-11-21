import express from "express";
import {
    createShipment,
    getAllShipments,
    updateShipmentStatus,
    trackShipment
} from "../controllers/shipmentController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.post("/", protect, adminOnly, createShipment);
router.get("/", protect, adminOnly, getAllShipments);
router.put("/:trackingNumber/status", protect, adminOnly, updateShipmentStatus);

//Public Route for tracking
router.get("/:trackingNumber", trackShipment);


export default router;
