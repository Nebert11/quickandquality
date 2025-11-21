import mongoose from "mongoose";

const shipmentSchema = mongoose.Schema({
    trackingNumber: { type: String, required: true, unique: true },
    senderName: String,
    receiverName: String,
    origin: String,
    destination: String,
    status: { type: String, enum: [ "Pending", "In Transit", "Delivered", "Canceled" ], default: "Pending" },
    estimatedDelivery: Date,
    details: String
}, { timestamps: true });

export default mongoose.model("Shipment", shipmentSchema);