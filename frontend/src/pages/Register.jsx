import { useState } from "react";
import { Link } from "react-router-dom";

function Register () {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setMessage(data.message || "Registered successfully");
        } catch (err) {
            console.error(err);
            setMessage("Registration failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-6 rounded shadow"
            >
                <h2 className="font-bold text-center text-3xl text-maroon mb-6">Register</h2>

                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2 w-full mb-3 rounded"
                    required
                />

                <input 
                    type="email" 
                    placeholder="Email" 
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 w-full mb-3 rounded"
                    required
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value })}
                    className="border p-2 w-full mb-3 rounded"
                    required
                />

                <button type="submit" className="bg-maroon text-white px-4 py-2 rounded w-full mb-3">Register</button>

                <p className="text-center">Already have an account? <Link to="/login" className="text-maroon font-semibold">Login</Link></p>

                {message && <p className="text-center mt-3 text-green-600">{message}</p>}
            </form>
        </div>
    )
}

export default Register;