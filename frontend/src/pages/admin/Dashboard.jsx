import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className=" flex-1 p-6">
                <h1 className="text-3xl font-bold text-red-900 mb-6">Admin Dashboard</h1>
                <p>Welcome back, Admin!</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-bold">Total Shipments</h2>
                        <p className="text-gray-600">123</p>
                    </div>

                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-bold">Active Users</h2>
                        <p className="text-gray-600">56</p>
                    </div>

                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-bold">Pending Deliveries</h2>
                        <p className="text-gray-600">8</p>
                    </div>

                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-bold">New Messages</h2>
                        <p className="text-gray-600">5</p>
                    </div>
                </div>
            </div>
        </div>
    );
}