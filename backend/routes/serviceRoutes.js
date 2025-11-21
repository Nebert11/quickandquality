import express from "express";
import { createService, getServices, updateService, deleteService } from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//Public
router.get("/", getServices);

//Admin only
router.post("/", protect, createService);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

export default router;