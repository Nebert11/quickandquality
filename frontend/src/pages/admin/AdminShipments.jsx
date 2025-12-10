import { useState, useEffect } from "react";
import API from "../../api";
import Sidebar from "../../components/Sidebar";

export default function AdminShipments() {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        // trackingNumber is generated server-side, don't send from client
        senderName: "",
        receiverName: "",
        origin: "",
        destination: "",
        status: "Pending",
        estimatedDelivery: "",
    });

    useEffect(() => {
        fetchShipments();
    }, []);

    const fetchShipments = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/shipments");
            setShipments(data);
        } catch (error) {
            alert("Failed to fetch shipments: " + error.message);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // editingId holds the trackingNumber
                await API.put(`/shipments/${editingId}/status`, { status: form.status });
                alert("Shipment status updated!");
            } else {
                // create shipment - server will generate a trackingNumber
                await API.post("/shipments", form);
                alert("Shipment created!");
            }
            setForm({
                senderName: "",
                receiverName: "",
                origin: "",
                destination: "",
                status: "Pending",
                estimatedDelivery: "",
            });
            setEditingId(null);
            setShowForm(false);
            fetchShipments();
        } catch (error) {
            alert("Error: " + (error.response?.data?.message || error.message));
        }
    };

    // Deletion is not supported by the backend currently. If needed, implement
    // a DELETE /shipments/:trackingNumber route on the server and re-enable.
    const handleDelete = async (id) => {
        alert("Delete is not supported by the API.");
    };

    const handleEdit = (shipment) => {
        // We only allow editing the status via trackingNumber
        setForm({
            senderName: shipment.senderName || "",
            receiverName: shipment.receiverName || "",
            origin: shipment.origin || "",
            destination: shipment.destination || "",
            status: shipment.status || "Pending",
            estimatedDelivery: shipment.estimatedDelivery ? shipment.estimatedDelivery.split("T")[0] : "",
        });
        setEditingId(shipment.trackingNumber);
        setShowForm(true);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-red-900">Manage Shipments</h1>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingId(null);
                            setForm({
                                trackingNumber: "",
                                senderName: "",
                                receiverName: "",
                                origin: "",
                                destination: "",
                                status: "Pending",
                                estimatedDelivery: "",
                            });
                        }}
                        className="bg-red-700 text-white px-4 py-2 rounded"
                    >
                        {showForm ? "Cancel" : "Add Shipment"}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded mb-6">
                        <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Status" : "Create Shipment"}</h2>
                        {!editingId && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Tracking Number"
                                    value={form.trackingNumber}
                                    onChange={(e) => setForm({ ...form, trackingNumber: e.target.value })}
                                    className="w-full p-2 border rounded mb-3"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Sender Name"
                                    value={form.senderName}
                                    onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                                    className="w-full p-2 border rounded mb-3"
                                />
                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    value={form.receiverName}
                                    onChange={(e) => setForm({ ...form, receiverName: e.target.value })}
                                    className="w-full p-2 border rounded mb-3"
                                />
                                <input
                                    type="text"
                                    placeholder="Origin"
                                    value={form.origin}
                                    onChange={(e) => setForm({ ...form, origin: e.target.value })}
                                    className="w-full p-2 border rounded mb-3"
                                />
                                <input
                                    type="text"
                                    placeholder="Destination"
                                    value={form.destination}
                                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                                    className="w-full p-2 border rounded mb-3"
                                />
                                <input
                                    type="date"
                                    value={form.estimatedDelivery}
                                    onChange={(e) => setForm({ ...form, estimatedDelivery: e.target.value })}
                                    className="w-full p-2 border rounded mb-3"
                                />
                            </>
                        )}
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="w-full p-2 border rounded mb-3"
                        >
                            <option>Pending</option>
                            <option>In Transit</option>
                            <option>Delivered</option>
                            <option>Collected</option>
                            <option>Canceled</option>
                        </select>
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            {editingId ? "Update Status" : "Create"}
                        </button>
                    </form>
                )}

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full border-collapse border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Tracking #</th>
                                <th className="border p-2">Sender</th>
                                <th className="border p-2">Receiver</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((shipment) => (
                                <tr key={shipment._id} className="hover:bg-gray-100">
                                    <td className="border p-2">{shipment.trackingNumber}</td>
                                    <td className="border p-2">{shipment.senderName}</td>
                                    <td className="border p-2">{shipment.receiverName}</td>
                                    <td className="border p-2">{shipment.status}</td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(shipment)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Edit
                                        </button>
                                        {/* Delete removed - unsupported by API */}
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
