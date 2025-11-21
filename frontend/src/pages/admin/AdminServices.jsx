import { useState, useEffect } from "react";
import API from "../../api";
import Sidebar from "../../components/Sidebar";

export default function AdminServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        icon: "",
        priceRange: "",
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/services");
            setServices(data);
        } catch (error) {
            alert("Failed to fetch services: " + error.message);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/services/${editingId}`, form);
                alert("Service updated!");
            } else {
                await API.post("/services", form);
                alert("Service created!");
            }
            setForm({ title: "", description: "", icon: "", priceRange: "" });
            setEditingId(null);
            setShowForm(false);
            fetchServices();
        } catch (error) {
            alert("Error: " + error.response?.data?.message || error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this service?")) {
            try {
                await API.delete(`/services/${id}`);
                alert("Service deleted!");
                fetchServices();
            } catch (error) {
                alert("Failed to delete: " + error.message);
            }
        }
    };

    const handleEdit = (service) => {
        setForm(service);
        setEditingId(service._id);
        setShowForm(true);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-maroon">Manage Services</h1>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingId(null);
                            setForm({ title: "", description: "", icon: "", priceRange: "" });
                        }}
                        className="bg-maroon text-white px-4 py-2 rounded"
                    >
                        {showForm ? "Cancel" : "Add Service"}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded mb-6">
                        <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Service" : "Create Service"}</h2>
                        <input
                            type="text"
                            placeholder="Service Title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                            rows="3"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Icon (emoji or icon name)"
                            value={form.icon}
                            onChange={(e) => setForm({ ...form, icon: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                        />
                        <input
                            type="text"
                            placeholder="Price Range (e.g., $10-$50)"
                            value={form.priceRange}
                            onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                        />
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            {editingId ? "Update" : "Create"}
                        </button>
                    </form>
                )}

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full border-collapse border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Icon</th>
                                <th className="border p-2">Price Range</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service._id} className="hover:bg-gray-100">
                                    <td className="border p-2">{service.title}</td>
                                    <td className="border p-2 truncate max-w-xs">{service.description}</td>
                                    <td className="border p-2 text-center text-2xl">{service.icon}</td>
                                    <td className="border p-2">{service.priceRange}</td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(service)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
