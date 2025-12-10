import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required:true },
    phone: String,
    message: { type: String, required: true },
    attended: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);