import { useState, useEffect, useMemo } from "react";
import API from "../../api";
import Sidebar from "../../components/Sidebar";

export default function AdminContacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("pending");

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/contact");
            setContacts(data);
        } catch (error) {
            alert("Failed to fetch contacts: " + error.message);
        }
        setLoading(false);
    };

    const pendingContacts = useMemo(() => {
        return contacts.filter(contact => !contact.attended);
    }, [contacts]);

    const attendedContacts = useMemo(() => {
        return contacts.filter(contact => contact.attended);
    }, [contacts]);

    const handleMarkAttended = async (id) => {
        try {
            await API.put(`/contact/${id}/attended`);
            alert("Message marked as attended!");
            fetchContacts();
        } catch (error) {
            alert("Failed to mark as attended: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this contact message?")) {
            try {
                await API.delete(`/contact/${id}`);
                alert("Message deleted!");
                fetchContacts();
            } catch (error) {
                alert("Failed to delete: " + error.message);
            }
        }
    };

    const displayContacts = activeTab === "pending" ? pendingContacts : attendedContacts;

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="w-full md:ml-64 flex-1 p-4 md:p-6 mt-12 md:mt-0">
                <h1 className="text-2xl md:text-3xl font-bold text-red-900 mb-6">Contact Messages</h1>

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
                        Pending ({pendingContacts.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("attended")}
                        className={`px-3 md:px-4 py-2 font-semibold border-b-2 transition text-sm md:text-base whitespace-nowrap ${
                            activeTab === "attended"
                                ? "border-green-600 text-green-600"
                                : "border-transparent text-gray-600 hover:text-green-600"
                        }`}
                    >
                        Attended ({attendedContacts.length})
                    </button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : displayContacts.length === 0 ? (
                    <p className="text-gray-600">No {activeTab} messages</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border text-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2 hidden md:table-cell">Email</th>
                                    <th className="border p-2 hidden lg:table-cell">Phone</th>
                                    <th className="border p-2">Message</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayContacts.map((contact) => (
                                    <tr key={contact._id} className="hover:bg-gray-100">
                                        <td className="border p-2 font-semibold text-xs md:text-sm">{contact.name}</td>
                                        <td className="border p-2 hidden md:table-cell text-xs md:text-sm">{contact.email}</td>
                                        <td className="border p-2 hidden lg:table-cell text-xs">{contact.phone}</td>
                                        <td className="border p-2 truncate max-w-xs text-xs md:text-sm">{contact.message}</td>
                                        <td className="border p-2 space-x-1 flex flex-wrap gap-1">
                                            {activeTab === "pending" && (
                                                <button
                                                    onClick={() => handleMarkAttended(contact._id)}
                                                    className="bg-green-600 text-white px-2 md:px-3 py-1 rounded text-xs"
                                                >
                                                    Attended
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(contact._id)}
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
                )}
            </div>
        </div>
    );
}
