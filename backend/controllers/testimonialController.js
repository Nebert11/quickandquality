import Testimonial from "../models/Testimonial.js";

// Create new testimonial (public - from clients)
export const createTestimonial = async (req, res) => {
    const { clientName, email, rating, message, trackingNumber } = req.body;

    try {
        const testimonial = await Testimonial.create({
            clientName,
            email,
            rating,
            message,
            trackingNumber,
            approved: false,
        });
        res.status(201).json({ message: "Testimonial submitted! Thank you for your feedback.", testimonial });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all approved testimonials (public)
export const getApprovedTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all testimonials including pending (admin only)
export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve testimonial (admin only)
export const approveTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });

        testimonial.approved = true;
        await testimonial.save();
        res.json({ message: "Testimonial approved", testimonial });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reject/Delete testimonial (admin only)
export const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });

        await testimonial.deleteOne();
        res.json({ message: "Testimonial deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
