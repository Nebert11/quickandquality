import { useState, useEffect, useMemo } from "react";
import API from "../../api";
import Sidebar from "../../components/Sidebar";

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activeTab, setActiveTab] = useState("pending");
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
            const { data } = await API.get("/testimonials/admin/all");
            setTestimonials(data);
        } catch (error) {
            console.log("Failed to fetch testimonials (may not be implemented yet)");
        }
        setLoading(false);
    };

    const pendingTestimonials = useMemo(() => {
        return testimonials.filter(t => !t.approved);
    }, [testimonials]);

    const approvedTestimonials = useMemo(() => {
        return testimonials.filter(t => t.approved);
    }, [testimonials]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/testimonials/${editingId}/approve`, form);
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

    const handleApprove = async (id) => {
        if (window.confirm("Approve this testimonial?")) {
            try {
                await API.put(`/testimonials/${id}/approve`);
                alert("Testimonial approved!");
                fetchTestimonials();
            } catch (error) {
                alert("Failed to approve: " + error.message);
            }
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

    const displayTestimonials = activeTab === "pending" ? pendingTestimonials : approvedTestimonials;

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="w-full md:ml-64 flex-1 p-4 md:p-6 mt-12 md:mt-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-red-900">Manage Testimonials</h1>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingId(null);
                            setForm({ clientName: "", rating: 5, message: "" });
                        }}
                        className="w-full md:w-auto bg-red-700 text-white px-4 py-2 rounded text-sm"
                    >
                        {showForm ? "Cancel" : "Add Testimonial"}
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 md:gap-4 mb-6 border-b overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("pending")}
                        className={`px-3 md:px-4 py-2 font-semibold border-b-2 transition text-sm md:text-base whitespace-nowrap ${
                            activeTab === "pending"
                                ? "border-red-900 text-red-900"
                                : "border-transparent text-gray-600 hover:text-red-900"
                        }`}
                    >
                        Pending ({pendingTestimonials.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("approved")}
                        className={`px-3 md:px-4 py-2 font-semibold border-b-2 transition text-sm md:text-base whitespace-nowrap ${
                            activeTab === "approved"
                                ? "border-green-600 text-green-600"
                                : "border-transparent text-gray-600 hover:text-green-600"
                        }`}
                    >
                        Approved ({approvedTestimonials.length})
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 md:p-6 rounded mb-6">
                        <h2 className="text-lg md:text-xl font-bold mb-4">{editingId ? "Edit Testimonial" : "Create Testimonial"}</h2>
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={form.clientName}
                            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                            className="w-full p-2 border rounded mb-3 text-sm"
                            required
                        />
                        <select
                            value={form.rating}
                            onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded mb-3 text-sm"
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
                            className="w-full p-2 border rounded mb-3 text-sm"
                            rows="4"
                            required
                        />
                        <button type="submit" className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded text-sm">
                            {editingId ? "Update" : "Create"}
                        </button>
                    </form>
                )}

                {loading ? (
                    <p>Loading...</p>
                ) : displayTestimonials.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border text-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border p-2">Client Name</th>
                                    <th className="border p-2 hidden md:table-cell">Email</th>
                                    <th className="border p-2">Rating</th>
                                    <th className="border p-2 hidden lg:table-cell">Message</th>
                                    <th className="border p-2 hidden xl:table-cell">Tracking #</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayTestimonials.map((testimonial) => (
                                    <tr key={testimonial._id} className="hover:bg-gray-100">
                                        <td className="border p-2 font-semibold text-xs md:text-sm">{testimonial.clientName}</td>
                                        <td className="border p-2 hidden md:table-cell text-xs md:text-sm">{testimonial.email}</td>
                                        <td className="border p-2 text-xs md:text-sm">{"⭐".repeat(testimonial.rating)}</td>
                                        <td className="border p-2 hidden lg:table-cell truncate max-w-xs text-xs">{testimonial.message}</td>
                                        <td className="border p-2 hidden xl:table-cell text-xs">{testimonial.trackingNumber || "N/A"}</td>
                                        <td className="border p-2 space-x-1 flex flex-wrap gap-1">
                                            {activeTab === "pending" && (
                                                <button
                                                    onClick={() => handleApprove(testimonial._id)}
                                                    className="bg-green-600 text-white px-2 md:px-3 py-1 rounded text-xs"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {activeTab === "approved" && (
                                                <button
                                                    onClick={() => handleEdit(testimonial)}
                                                    className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded text-xs"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(testimonial._id)}
                                                className="bg-red-600 text-white px-2 md:px-3 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600">No {activeTab} testimonials</p>
                )}
            </div>
        </div>
    );
}
