import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="bg-maroon text-white min-h-screen w-64 p-6 sticky top-24 self-start shrink-0 rounded-r-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
            <nav className="flex flex-col space-y-4">
                <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
                <Link to="/admin/shipments" className="hover:text-gray-300">Shipments</Link>
                <Link to="/admin/services" className="hover:text-gray-300">Services</Link>
                <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
                <Link to="/admin/contacts" className="hover:text-gray-300">Contacts</Link>
                <Link to="/admin/testimonials" className="hover:text-gray-300">Testimonials</Link>
            </nav>
        </aside>
    );
}