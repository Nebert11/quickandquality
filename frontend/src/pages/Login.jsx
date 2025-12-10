import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-courier.jpg";
import logo from "../assets/logo.svg";

export default function Login () {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
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
        <main className="relative left-1/2 -translate-x-1/2 w-screen min-h-[90vh] items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={heroImage} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-red-900 opacity-90"></div>
            </div>
            
            <section className="container mx-auto relative z-10 justify-center items-center flex h-screen">

                <div className="bg-white/20 p-6 rounded-lg flex gap-10 shadow-2xl shadow-red-950">
                    <div className="p-6">
                        <img src={logo} className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                        <h2 className="font-bold text-white mt-6 text-5xl ">Welcome!</h2>
                        <p className="font-bold text-3xl text-white mt-6">_____</p>
                        <div className="mt-8">
                            <p>Welcome to Quick and Quality. Login to access the admin dashboard!</p>
                        </div>
                        
                    </div>

                    <div className="h-full w-[50vh] mx-auto">
                        <form onSubmit={handleSubmit}
                            className="space-y-4">
                            <h2 className="font-bold text-3xl text-center text-white mb-6">Login</h2>

                            <p className="text-white/90 font-semibold text-sm mb-0">Email</p>
                            <input 
                                type="email" 
                                className="bg-white/30 w-full p-2 rounded-lg"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })} 
                            />

                            <p className="text-white/90 font-semibold text-sm mb-0">Password</p>
                            <input 
                                type="password" 
                                className="bg-white/30 w-full p-2 rounded-lg"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })} 
                            />

                            <button className="w-full bg-maroon text-white p-2 rounded-full hover:bg-maroon-800 mt-2">Login</button>

                            {message && <p className="text-center mt-4 text-gray-600">{message}</p>}
                        </form>
                    </div>
                    
                </div>
            </section>
        </main> 
    )
}