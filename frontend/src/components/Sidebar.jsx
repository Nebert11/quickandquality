import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed h-full top-4 left-4 z-50 md:hidden bg-maroon text-white p-2 rounded-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed md:sticky top-0 md:top-24 left-0 h-screen md:h-screen z-40 md:z-0 bg-maroon text-white w-64 p-6 md:self-start md:shrink-0 rounded-r-xl shadow-lg transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}>
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                <nav className="flex flex-col space-y-4">
                    <Link 
                        to="/admin/dashboard" 
                        className="hover:text-gray-300 transition py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/admin/shipments" 
                        className="hover:text-gray-300 transition py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Shipments
                    </Link>
                    <Link 
                        to="/admin/users" 
                        className="hover:text-gray-300 transition py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Users
                    </Link>
                    <Link 
                        to="/admin/contacts" 
                        className="hover:text-gray-300 transition py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Messages
                    </Link>
                    <Link 
                        to="/admin/testimonials" 
                        className="hover:text-gray-300 transition py-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Testimonials
                    </Link>
                </nav>
            </aside>
        </>
    );
}