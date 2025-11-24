import { useEffect, useState } from "react";
import API from "../api";
import { ShoppingCart, Zap, FileCheck, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

function ServicesPreview () {
    // const [services, setServices] = useState([]); 

    // {/* Fetch Services from the backend */}
    // useEffect(() => {
    //     const fetchServices = async () => {
    //         const { data } = await API.get("/services");
    //         setServices(data);
    //     };
    //     fetchServices();
    // }, []);

    // // Icon selection based on service title (fallback to Package)
    // const getIcon = (title) => {
    //     if (!title) return Package;
    //     const t = title.toLowerCase();
    //     if (t.includes("express") || t.includes("delivery")) return Truck;
    //     if (t.includes("insurance") || t.includes("secure")) return ShieldCheck;
    //     if (t.includes("international") || t.includes("global")) return Globe2;
    //     return Package;
    // };

    const services = [
        {
          key: "international",
          Icon: Globe,
          title: "International Shipping",
          description:
            "Fast and secure delivery to over 150 countries worldwide with real-time tracking.",
        },
        {
          key: "same-day",
          Icon: Zap,
          title: "Same-Day Delivery (Nairobi)",
          description:
            "Urgent deliveries within the city with guaranteed same-day service.",
        },
        {
          key: "ecommerce",
          Icon: ShoppingCart,
          title: "E-commerce Fulfillment",
          description:
            "Complete order fulfillment solutions for your online business needs.",      
        },
        {
          key: "customs",
          Icon: FileCheck,
          title: "Customs Clearance Assistance",
          description:
            "Expert assistance with customs documentation and clearance procedures.",
        },
      ];

    return (
        <section className="py-20 ">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">Comprehensive logistics solutions tailored to meet your business needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {services.map((service) => (
                <Card
                  key={service.key}
                  className="hover-lift shadow-elegant border-border"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mt-4 mb-4">
                      <service.Icon className="h-6 w-6 text-red-900 " />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>

                    <p className="text-gray-500 mb-6">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
                <Link to="/services">
                    <button className="bg-red-800 hover:bg-red-950 text-white px-8 py-4 rounded-xl">
                        View All Services
                    </button>
                </Link>
            </div>
          </div>
        </section>
    );
}


export default ServicesPreview;