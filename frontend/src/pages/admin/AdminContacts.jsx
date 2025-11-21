import { useState, useEffect } from "react";
import API from "../../api";
import Sidebar from "../../components/Sidebar";

export default function AdminContacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 flex-1 p-6">
                <h1 className="text-3xl font-bold text-red-900 mb-6">Contact Messages</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full border-collapse border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Phone</th>
                                <th className="border p-2">Message</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact._id} className="hover:bg-gray-100">
                                    <td className="border p-2">{contact.name}</td>
                                    <td className="border p-2">{contact.email}</td>
                                    <td className="border p-2">{contact.phone}</td>
                                    <td className="border p-2 truncate max-w-xs">{contact.message}</td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => handleDelete(contact._id)}
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
