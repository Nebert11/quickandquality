import Shipment from "../models/Shipment.js";
import { v4 as uuidv4 } from "uuid";

//Create new shipment
export const createShipment = async (req, res) => {
    const { senderName, receiverName, origin, destination, estimatedDelivery, details } = req.body;

    try {
        const trackingNumber = `QQ-${uuidv4().split("-")[0].toUpperCase()}`;
        const shipment = await Shipment.create({
            trackingNumber, 
            senderName, 
            receiverName, 
            origin, 
            destination, 
            estimatedDelivery, 
            details,
        });
        res.status(201).json(shipment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get All shipments (Admin)
export const getAllShipments = async (req, res) => {
    try{
        const shipments = await Shipment.find({});
        res.json(shipments);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

// Update shipment status by tracking number
export const updateShipmentStatus = async (req, res) => {
    try {
        const { trackingNumber } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Missing status in request body' });
        }

        // Validate allowed statuses (match model enum)
        const allowed = ["Pending", "In Transit", "Delivered", "Canceled"];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Allowed: ${allowed.join(', ')}` });
        }

        const shipment = await Shipment.findOne({ trackingNumber });
        if (!shipment) return res.status(404).json({ message: 'Shipment not found' });

        shipment.status = status;
        const updated = await shipment.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Track Shipment by tracking number
export const trackShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findOne({ trackingNumber: req.params.trackingNumber });
        if(!shipment) return res.status(404).json({ message: "Shipment not found" });
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};