import { useEffect, useState } from "react";

export default function BackendTest() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch ("http://localhost:5000/api")
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-maroon-700">{message || "Connecting...."}</h1>
        </div>
    );
}