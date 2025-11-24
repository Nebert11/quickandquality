import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react"; 
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navLinks = useMemo (
        () => [
            { name: "Home", path: "/" },
            { name: "Track Shipment", path: "/track" },
            { name: "Services", path: "/services" },
            { name: "Contact", path: "/contact" },
        ],
        []
    );
    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };
//max-w-full mx-auto px-6 sm:px-6 lg:px-8 
//relative container mx-auto px-6 left-0 right-0 z-50 backdrop-blur-sm shadow-md
    return(
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm shadow">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo on the left */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"/>
                    </Link>

                    {/* Nav links in the center */}
                    <div className="hidden md:flex items-center justify-center flex-1 gap-8">
                        {navLinks.map ((link) => (
                            <Link key={link.path} to={link.path}>
                                <button className="cursor-pointer text-gray-700 hover:text-red-900 font-medium transition-colors">
                                    {link.name}
                                </button>
                            </Link>
                        ))}
                    </div>

                    {/* Profile & Logout on the right */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="hidden md:flex items-center gap-3">
                                <button className="text-gray-700 hover:text-red-900 hover:bg-red-50 rounded-full h-10 w-10 p-0 flex items-center justify-center transition-colors"
                                onClick={() => navigate("/admin/dashboard")} aria-label="Admin dashboard">
                                    <UserRound className="h-5 w-5"/>
                                </button>

                                <button onClick={handleLogout} className="flex items-center gap-1 border border-red-900 text-red-900 hover:bg-red-900 hover:text-white rounded-lg px-4 py-2 font-medium transition-all">
                                    <LogOut className="h-4 w-4"/>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="hidden md:block border border-red-900 text-red-900 hover:bg-red-900 hover:text-white rounded-lg px-4 py-2 font-medium transition-all">Login</button>
                            </Link>
                        )}
                        
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                
                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden bg-gray-50 border-t border-gray-200 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:text-red-900 hover:bg-gray-100 rounded transition-colors">
                                    {link.name}
                                </button>
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <button onClick={() => { navigate("/admin/dashboard"); setIsOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:text-red-900 hover:bg-gray-100 rounded transition-colors">
                                    Admin Dashboard
                                </button>
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left px-4 py-2 text-red-900 hover:bg-red-50 rounded font-medium transition-colors">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <button className="block w-full text-left px-4 py-2 text-red-900 hover:bg-red-50 rounded font-medium transition-colors">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
};

export default Navbar;