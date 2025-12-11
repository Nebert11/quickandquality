import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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
        cost: "",
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
                cost: "",
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
            cost: shipment.cost || "",
        });
        setEditingId(shipment.trackingNumber);
        setShowForm(true);
    };

    const generateTrackingNumber = () => {
        const trackingNumber = `QQ-${uuidv4().split("-")[0].toUpperCase()}`;
        setForm({ ...form, trackingNumber });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="w-full md:ml-64 flex-1 p-4 md:p-6 mt-12 md:mt-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-red-900">Manage Shipments</h1>
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
                                cost: "",
                            });
                        }}
                        className="w-full md:w-auto bg-red-700 text-white px-4 py-2 rounded"
                    >
                        {showForm ? "Cancel" : "Add Shipment"}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 md:p-6 rounded mb-6 overflow-x-auto">
                        <h2 className="text-lg md:text-xl font-bold mb-4">{editingId ? "Edit Status" : "Create Shipment"}</h2>
                        {!editingId && (
                            <>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-2">Tracking Number</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Click Generate to create tracking number"
                                            value={form.trackingNumber}
                                            readOnly
                                            className="flex-1 p-2 border rounded text-sm bg-gray-50"
                                        />
                                        <button
                                            type="button"
                                            onClick={generateTrackingNumber}
                                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition"
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Sender Name"
                                    value={form.senderName}
                                    onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                                    className="w-full p-2 border rounded mb-3 text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    value={form.receiverName}
                                    onChange={(e) => setForm({ ...form, receiverName: e.target.value })}
                                    className="w-full p-2 border rounded mb-3 text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Origin"
                                    value={form.origin}
                                    onChange={(e) => setForm({ ...form, origin: e.target.value })}
                                    className="w-full p-2 border rounded mb-3 text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Destination"
                                    value={form.destination}
                                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                                    className="w-full p-2 border rounded mb-3 text-sm"
                                />
                                <input
                                    type="date"
                                    value={form.estimatedDelivery}
                                    onChange={(e) => setForm({ ...form, estimatedDelivery: e.target.value })}
                                    className="w-full p-2 border rounded mb-3 text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="Cost (KES)"
                                    value={form.cost}
                                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                                    className="w-full p-2 border rounded mb-3 text-sm"
                                    step="0.01"
                                    min="0"
                                />
                            </>
                        )}
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="w-full p-2 border rounded mb-3 text-sm"
                        >
                            <option>Pending</option>
                            <option>In Transit</option>
                            <option>Delivered</option>
                            <option>Collected</option>
                            <option>Canceled</option>
                        </select>
                        <button type="submit" className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded text-sm">
                            {editingId ? "Update Status" : "Create"}
                        </button>
                    </form>
                )}

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border text-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border p-2">Tracking #</th>
                                    <th className="border p-2">Sender</th>
                                    <th className="border p-2 hidden md:table-cell">Receiver</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2 hidden md:table-cell">Cost (KES)</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shipments.map((shipment) => (
                                    <tr key={shipment._id} className="hover:bg-gray-100">
                                        <td className="border p-2 font-semibold text-xs md:text-sm">{shipment.trackingNumber}</td>
                                        <td className="border p-2 text-xs md:text-sm">{shipment.senderName}</td>
                                        <td className="border p-2 hidden md:table-cell text-xs md:text-sm">{shipment.receiverName}</td>
                                        <td className="border p-2 text-xs md:text-sm">{shipment.status}</td>
                                        <td className="border p-2 hidden md:table-cell text-xs md:text-sm font-semibold">KES {shipment.cost || 0}</td>
                                        <td className="border p-2 space-x-1">
                                            <button
                                                onClick={() => handleEdit(shipment)}
                                                className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
