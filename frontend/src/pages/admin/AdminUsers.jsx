import { useState, useEffect } from "react";
import API from "../../api";
import Sidebar from "../../components/Sidebar";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/users/profile");
            setUsers(Array.isArray(data) ? data : [data]);
        } catch (error) {
            alert("Failed to fetch users: " + error.message);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this user?")) {
            try {
                // Note: You may need to implement a DELETE user endpoint in your backend
                alert("User deletion not yet implemented on backend");
            } catch (error) {
                alert("Failed to delete: " + error.message);
            }
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 flex-1 p-6">
                <h1 className="text-3xl font-bold text-red-900 mb-6">Manage Users</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full border-collapse border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td className="border p-2">{user.name}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.role || "customer"}</td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => handleDelete(user._id)}
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
