import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { LogOut, Menu, UserRound, X, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react"; 
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navLinks = useMemo (
        () => [
            { name: "Home", path: "/" },
            { name: "Track Shipment", path: "/track" },
            { name: "Services", path: "/services" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
        ],
        []
    );
    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };
    
    const goToAdmin = () => {
        navigate("/admin/dashboard");
        setIsProfileOpen(false);
    };
    
    return(
        <nav className="relative top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm shadow">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo on the left */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} className="h-14 md:h-20 w-auto transition-transform duration-300 group-hover:scale-105"/>
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
                    <div className="flex items-center gap-2 md:gap-4">
                        {user ? (
                            <>
                                {/* Desktop Profile Dropdown */}
                                <div className="hidden md:block relative">
                                    <button 
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 text-gray-700 hover:text-red-900 hover:bg-red-50 rounded-lg px-3 py-2 transition-colors"
                                    >
                                        <UserRound className="h-5 w-5"/>
                                        <span className="text-sm font-medium">Admin</span>
                                        <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}/>
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                                            <button 
                                                onClick={goToAdmin}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-900 transition-colors flex items-center gap-2"
                                            >
                                                <UserRound className="h-4 w-4"/>
                                                Admin Dashboard
                                            </button>
                                            <hr className="my-1"/>
                                            <button 
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-red-900 hover:bg-red-50 transition-colors flex items-center gap-2"
                                            >
                                                <LogOut className="h-4 w-4"/>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link to="/login">
                                <button className="hidden md:block border border-red-900 text-red-900 hover:bg-red-900 hover:text-white rounded-lg px-4 py-2 font-medium transition-all text-sm">Login</button>
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
                                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:text-red-900 hover:bg-gray-100 rounded transition-colors text-sm">
                                    {link.name}
                                </button>
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <button 
                                    onClick={() => { 
                                        goToAdmin(); 
                                        setIsOpen(false); 
                                    }} 
                                    className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-900 hover:bg-gray-100 rounded transition-colors text-sm font-medium"
                                >
                                    <UserRound className="h-4 w-4"/>
                                    Admin Dashboard
                                </button>
                                <hr className="my-1"/>
                                <button 
                                    onClick={() => { 
                                        handleLogout(); 
                                        setIsOpen(false); 
                                    }} 
                                    className="flex w-full items-center gap-2 px-4 py-2 text-red-900 hover:bg-red-50 rounded font-medium transition-colors text-sm"
                                >
                                    <LogOut className="h-4 w-4"/>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <button className="block w-full text-left px-4 py-2 text-red-900 hover:bg-red-50 rounded font-medium transition-colors text-sm">
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