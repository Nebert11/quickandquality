import express from "express";
import { createContact, getContacts, deleteContact, markAttended } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//Public
router.post("/", createContact);

//Admin only
router.get("/", protect, getContacts);
router.delete("/:id", protect, deleteContact);
router.put("/:id/attended", protect, markAttended);

export default router;