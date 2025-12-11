import mongoose from "mongoose";

const shipmentSchema = mongoose.Schema({
    trackingNumber: { type: String, required: true, unique: true },
    senderName: String,
    receiverName: String,
    origin: String,
    destination: String,
    status: { type: String, enum: [ "Pending", "In Transit", "Delivered", "Collected", "Canceled" ], default: "Pending" },
    estimatedDelivery: Date,
    details: String,
    cost: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Shipment", shipmentSchema);