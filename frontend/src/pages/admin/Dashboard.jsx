import { useState, useEffect } from "react";
import API from "../../api";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalShipments: 0,
        activeUsers: 0,
        pendingDeliveries: 0,
        newMessages: 0,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setStats(prev => ({ ...prev, loading: true, error: null }));

            // Fetch all shipments
            const shipmentsRes = await API.get("/shipments");
            const allShipments = shipmentsRes.data;
            const totalShipments = allShipments.length;
            const pendingDeliveries = allShipments.filter(s => s.status === "Pending").length;

            // Fetch all contacts (messages)
            const contactsRes = await API.get("/contact");
            const newMessages = contactsRes.data ? contactsRes.data.length : 0;

            setStats({
                totalShipments,
                activeUsers: 0, // Will be updated if we have a user count endpoint
                pendingDeliveries,
                newMessages,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            setStats(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || "Failed to load dashboard stats"
            }));
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className=" flex-1 p-6">
                <h1 className="text-3xl font-bold text-red-900 mb-6">Admin Dashboard</h1>
                <p>Welcome back, Admin!</p>

                {stats.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {stats.error}
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-bold">Total Shipments</h2>
                        <p className="text-gray-600 text-2xl font-semibold">
                            {stats.loading ? "..." : stats.totalShipments}
                        </p>
                    </div>

                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-bold">Active Users</h2>
                        <p className="text-gray-600 text-2xl font-semibold">
                            {stats.loading ? "..." : stats.activeUsers}
                        </p>
                    </div>

                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-bold">Pending Deliveries</h2>
                        <p className="text-gray-600 text-2xl font-semibold">
                            {stats.loading ? "..." : stats.pendingDeliveries}
                        </p>
                    </div>

                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-bold">New Messages</h2>
                        <p className="text-gray-600 text-2xl font-semibold">
                            {stats.loading ? "..." : stats.newMessages}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}