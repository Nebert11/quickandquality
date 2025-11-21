import { useState, useEffect } from "react";
import API from "../../api";
import Sidebar from "../../components/Sidebar";

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        clientName: "",
        rating: 5,
        message: "",
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/testimonials");
            setTestimonials(data);
        } catch (error) {
            console.log("Failed to fetch testimonials (may not be implemented yet)");
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/testimonials/${editingId}`, form);
                alert("Testimonial updated!");
            } else {
                await API.post("/testimonials", form);
                alert("Testimonial created!");
            }
            setForm({ clientName: "", rating: 5, message: "" });
            setEditingId(null);
            setShowForm(false);
            fetchTestimonials();
        } catch (error) {
            alert("Error: " + error.response?.data?.message || error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this testimonial?")) {
            try {
                await API.delete(`/testimonials/${id}`);
                alert("Testimonial deleted!");
                fetchTestimonials();
            } catch (error) {
                alert("Failed to delete: " + error.message);
            }
        }
    };

    const handleEdit = (testimonial) => {
        setForm(testimonial);
        setEditingId(testimonial._id);
        setShowForm(true);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-red-900">Manage Testimonials</h1>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingId(null);
                            setForm({ clientName: "", rating: 5, message: "" });
                        }}
                        className="bg-red-700 text-white px-4 py-2 rounded"
                    >
                        {showForm ? "Cancel" : "Add Testimonial"}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded mb-6">
                        <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Testimonial" : "Create Testimonial"}</h2>
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={form.clientName}
                            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                            required
                        />
                        <select
                            value={form.rating}
                            onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded mb-3"
                        >
                            <option value={5}>5 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={2}>2 Stars</option>
                            <option value={1}>1 Star</option>
                        </select>
                        <textarea
                            placeholder="Message"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                            rows="4"
                            required
                        />
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            {editingId ? "Update" : "Create"}
                        </button>
                    </form>
                )}

                {loading ? (
                    <p>Loading...</p>
                ) : testimonials.length > 0 ? (
                    <table className="w-full border-collapse border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Client Name</th>
                                <th className="border p-2">Rating</th>
                                <th className="border p-2">Message</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.map((testimonial) => (
                                <tr key={testimonial._id} className="hover:bg-gray-100">
                                    <td className="border p-2">{testimonial.clientName}</td>
                                    <td className="border p-2">{"⭐".repeat(testimonial.rating)}</td>
                                    <td className="border p-2 truncate max-w-xs">{testimonial.message}</td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(testimonial)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(testimonial._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No testimonials yet. Create one!</p>
                )}
            </div>
        </div>
    );
}
