import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema({
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
    approved: { type: Boolean, default: false },
    trackingNumber: String,
}, { timestamps: true });

export default mongoose.model("Testimonial", testimonialSchema);
