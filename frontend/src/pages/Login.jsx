import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-courier.jpg";
import logo from "../assets/logo.png";

export default function Login () {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
            const res = await fetch(`${apiBaseUrl}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(form),
            }); 
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("User", JSON.stringify(data)); // Store user data with role
                setMessage("Log in successful");
                // Redirect to admin dashboard if admin, otherwise home
                const redirectPath = data.role === "admin" ? "/admin/dashboard" : "/";
                navigate(redirectPath);
            } else{
                setMessage(data.message || "Login Failed");
            }
        } catch (err) {
            setMessage("Log in failed");
        }
    };

    return (
        <main className="relative left-1/2 -translate-x-1/2 w-screen min-h-screen items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={heroImage} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-yellow-900 opacity-90"></div>
            </div>
            
            <section className="container mx-auto relative z-10 justify-center items-center flex min-h-screen px-4">

                <div className="bg-white/20 p-4 md:p-6 rounded-lg flex flex-col md:flex-row md:gap-10 shadow-2xl shadow-red-950 w-full md:max-w-5xl">
                    <div className="p-6 md:p-8 flex flex-col justify-center md:min-w-[300px]">
                        <img src={logo} className="h-12 md:h-18 md:w-[200px] transition-transform duration-300 group-hover:scale-105" />
                        <h2 className="font-bold text-white mt-4 md:mt-6 text-3xl md:text-5xl">Welcome!</h2>
                        <p className="font-bold text-2xl md:text-3xl text-white mt-4 md:mt-6">_____</p>
                        <div className="mt-6 md:mt-8">
                            <p className="text-white text-sm md:text-base">Welcome to Quick and Quality. Login to access the admin dashboard!</p>
                        </div>
                    </div>

                    <div className="w-full md:w-auto md:min-w-[400px] px-4 md:px-0">
                        <form onSubmit={handleSubmit}
                            className="space-y-4">
                            <h2 className="font-bold text-2xl md:text-3xl text-center text-white mb-6">Login</h2>

                            <p className="text-white/90 font-semibold text-sm mb-2">Email</p>
                            <input 
                                type="email" 
                                className="bg-white/30 w-full p-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })} 
                                required
                            />

                            <p className="text-white/90 font-semibold text-sm mb-2">Password</p>
                            <input 
                                type="password" 
                                className="bg-white/30 w-full p-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })} 
                                required
                            />

                            <button className="w-full bg-maroon text-white p-2 rounded-full hover:bg-maroon-800 mt-4 font-semibold transition duration-200 active:scale-95">Login</button>

                            {message && <p className="text-center mt-4 text-gray-100 text-sm md:text-base">{message}</p>}
                        </form>
                    </div>
                    
                </div>
            </section>
        </main> 
    )
}