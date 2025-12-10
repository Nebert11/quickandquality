import express from "express";
import {
    createTestimonial,
    getApprovedTestimonials,
    getAllTestimonials,
    approveTestimonial,
    deleteTestimonial,
} from "../controllers/testimonialController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/", createTestimonial);
router.get("/", getApprovedTestimonials);

// Admin only routes
router.get("/admin/all", protect, adminOnly, getAllTestimonials);
router.put("/:id/approve", protect, adminOnly, approveTestimonial);
router.delete("/:id", protect, adminOnly, deleteTestimonial);

export default router;
