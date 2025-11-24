import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
        <section className="flex flex-col items-center h-screen justify-center left-0 right-0">
            <div className="bg-red-50 p-6 rounded-lg">
                <form onSubmit={handleSubmit}
                className="space-y-4">
                    <h2 className="font-bold text-3xl text-center text-maroon-700 mb-6">Login</h2>

                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-2 border rounded"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 border rounded mt-2"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })} 
                    />

                    <button className="w-full bg-maroon text-white p-2 rounded hover:bg-maroon-800 mt-2">Login</button>

                    {message && <p className="text-center mt-4 text-gray-600">{message}</p>}
                </form>
            </div>
        </section>
        
    )
}