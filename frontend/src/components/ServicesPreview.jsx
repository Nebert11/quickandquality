import { useEffect, useState } from "react";
import API from "../api";
import { Package, Truck, ShieldCheck, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";

function Services () {
    const [services, setServices] = useState([]);

    {/* Fetch Services from the backend */}
    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await API.get("/services");
            setServices(data);
        };
        fetchServices();
    }, []);

    // Icon selection based on service title (fallback to Package)
    const getIcon = (title) => {
        if (!title) return Package;
        const t = title.toLowerCase();
        if (t.includes("express") || t.includes("delivery")) return Truck;
        if (t.includes("insurance") || t.includes("secure")) return ShieldCheck;
        if (t.includes("international") || t.includes("global")) return Globe2;
        return Package;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-extrabold mb-10 text-center text-red-900 tracking-tight">Our Services</h2>
            <p></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((srv) => {
                    const Icon = getIcon(srv.title);
                    return (
                        <div key={srv._id} className="bg-white border border-red-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group p-7 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="bg-red-100 rounded-full p-4 mb-4 flex items-center justify-center shadow-sm">
                                <Icon className="h-8 w-8 text-red-700 group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-bold text-red-900 mb-2 group-hover:text-red-700 transition-colors">{srv.title}</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed flex-1">{srv.description}</p>
                            {srv.priceRange && <p className="mt-2 text-red-700 font-semibold bg-red-50 rounded px-3 py-1 inline-block">{srv.priceRange}</p>}
                        </div>
                    );
                })}
            </div>
            <div className="text-center">
                <Link to="/services">
                    <button className="bg-maroon rounded-xl shadow-sm text-white justify-center px-8 py-4 mt-4 hover:opacity/80">View All Services</button>
                </Link>
            </div>
        </div>
    );
}


export default Services;