import { useState, useEffect } from "react";
import API from "../../api";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalShipments: 0,
        activeUsers: 0,
        pendingDeliveries: 0,
        inTransitShipments: 0,
        deliveredShipments: 0,
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
            const inTransitShipments = allShipments.filter(s => s.status === "In Transit").length;
            const deliveredShipments = allShipments.filter(s => s.status === "Delivered").length;

            // Fetch all contacts (messages)
            const contactsRes = await API.get("/contact");
            const newMessages = contactsRes.data ? contactsRes.data.length : 0;

            setStats({
                totalShipments,
                activeUsers: 0, // Will be updated if we have a user count endpoint
                pendingDeliveries,
                inTransitShipments,
                deliveredShipments,
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
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="w-full flex-1 p-4 md:p-6 mt-12 md:mt-0">
                <h1 className="text-2xl md:text-3xl font-bold text-red-900 mb-2 md:mb-6">Admin Dashboard</h1>
                <p className="text-sm md:text-base mb-4 md:mb-6">Welcome back, Admin!</p>

                {stats.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm">
                        {stats.error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                    <div className="bg-white shadow p-4 md:p-6 rounded">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">Total Shipments</h2>
                        <p className="text-gray-600 text-2xl md:text-3xl font-semibold mt-2">
                            {stats.loading ? "..." : stats.totalShipments}
                        </p>
                    </div>

                    <div className="bg-white shadow p-4 md:p-6 rounded">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">Pending Deliveries</h2>
                        <p className="text-yellow-600 text-2xl md:text-3xl font-semibold mt-2">
                            {stats.loading ? "..." : stats.pendingDeliveries}
                        </p>
                    </div>

                    <div className="bg-white shadow p-4 md:p-6 rounded">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">In Transit</h2>
                        <p className="text-blue-600 text-2xl md:text-3xl font-semibold mt-2">
                            {stats.loading ? "..." : stats.inTransitShipments}
                        </p>
                    </div>

                    <div className="bg-white shadow p-4 md:p-6 rounded">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">Delivered</h2>
                        <p className="text-green-600 text-2xl md:text-3xl font-semibold mt-2">
                            {stats.loading ? "..." : stats.deliveredShipments}
                        </p>
                    </div>

                    <div className="bg-white shadow p-4 md:p-6 rounded">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">Active Users</h2>
                        <p className="text-gray-600 text-2xl md:text-3xl font-semibold mt-2">
                            {stats.loading ? "..." : stats.activeUsers}
                        </p>
                    </div>

                    <div className="bg-white shadow p-4 md:p-6 rounded">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">New Messages</h2>
                        <p className="text-gray-600 text-2xl md:text-3xl font-semibold mt-2">
                            {stats.loading ? "..." : stats.newMessages}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}