import Contact from "../models/Contact.js";

//Create new contact message
export const createContact = async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        const contact = await Contact.create({ name, email, phone, message });
        res.status(201).json({ message: "Message received!", contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get all messages (admin)
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete message (admin only)
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({ message: "Message not found" });

        await contact.deleteOne();
        res.status(201).json({ message: "Message deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};