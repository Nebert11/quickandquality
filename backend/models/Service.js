import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: String,
    priceRange: String,
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);