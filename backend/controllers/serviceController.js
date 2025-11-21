import Service from "../models/Service.js";

//Add new Service
export const createService = async (req, res) => {
    const { title, description, icon, priceRange } = req.body;

    try {
        const service = await Service.create({ title, description, icon, priceRange });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get All services (public)
export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update services
export const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if(!service) return res.status(404).json({ message: "Service not found"});

        Object.assign(service, req.body);
        await service.save();
        res.status(201).json({ message: "Service updated successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete Service
export const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });

        await service.deleteOne();
        res.json({ message: "Service deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};