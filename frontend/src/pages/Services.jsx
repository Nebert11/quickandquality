import { useEffect, useState } from "react";
import API from "../api";
import { Package, Truck, Clock, Shield, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";

function Services () {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch services from the backend
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await API.get("/services");
                setServices(data || []);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch services", err);
                setError("We couldn't load services from the server right now.");
            } finally {
                setLoading(false);
            }
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

    const additionalFeatures = [
        {
            icon: Truck,
            title: "Fleet Management",
            description: "Professional packing services",
        },
        {
            icon: Package,
            title: "Secure Packaging",
            description: "Professional packing services",
        },
        {
            icon: Shield,
            title: "Insurance Options",
            description: "Comprehensive coverage plans",
        },
        {
            icon: Clock,
            title: "24/7 Support",
            description: "Round the clock customer support",
        },
    ];

    return (
        <div className="min-h-screen">
            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-hero text-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center text-primary animate-fade-in">
                        <h1 className="text-5xl font-bold mb-6">Our Services</h1>
                        <p className="text-xl opacity-90 leading-relaxed">
                            Comprehensive logistics solutions designed to meet all your shipping 
                            and delivery needs with speed, reliability, and quality.
                        </p>
                        {error && (
                            <p className="mt-4 text-sm text-secondary-foreground">
                            {error}. Showing a curated overview while we reconnect to the live data.
                            </p>
                        )}
                        </div>
                    </div>
                </section>

                {/* Main Services */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                        {(loading ? fallbackMainServices : displayServices).map((service) => (
                            <Card
                            key={service.key}
                            className="hover-lift shadow-elegant border-border"
                            >
                            <CardContent className="p-8">
                                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                <service.Icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                {service.description}
                                </p>
                                {service.priceRange && (
                                <p className="text-sm font-semibold text-primary mb-6">
                                    Pricing: {service.priceRange}
                                </p>
                                )}
                                {service.features && (
                                <div className="space-y-2">
                                    {service.features.map((feature, i) => (
                                    <div key={feature} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                        <span className="text-foreground">{feature}</span>
                                    </div>
                                    ))}
                                </div>
                                )}
                            </CardContent>
                            </Card>
                        ))}
                        </div>
                    </div>
                </section>

                {/* Additional Features */}
                <section className="py-20 bg-secondary">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Additional features that set us apart from the competition
                        </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {additionalFeatures.map((feature, index) => (
                            <Card
                            key={index}
                            className="hover-lift shadow-elegant border-border text-center"
                            >
                            <CardContent className="p-6">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h4 className="font-semibold mb-2">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </CardContent>
                            </Card>
                        ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <Card className="max-w-4xl mx-auto shadow-elegant border-border">
                        <CardContent className="p-12 text-center">
                            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                            Contact us today to discuss your logistics needs and get a customized solution
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 rounded-xl">
                                Contact Us
                                </Button>
                            </Link>
                            <Link to="/track">
                                <Button size="lg" variant="outline" className="border-2 px-8 rounded-xl">
                                Track Shipment
                                </Button>
                            </Link>
                            </div>
                        </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
        </div>

        // <div className="min-h-screen">
        //     <main className="pt-20">
        //         <section className="py-20 ">
        //             <div className="container mx-auto px-4">
        //                 <div className="max-w-3xl mx-auto text-center animate-fade-in">
        //                     <h1 className="text-5xl font-bold mb-6">Our Services</h1>
        //                     <p className="text-xl opacity-100 text-maroon leading-relaxed">
        //                         Comprehensive logistics solutions designed to meet all your shipping and delivery needs with speed, reliability, and quality.
        //                     </p>
        //                     {error && (
        //                         <p className="mt-4 text-sm text-gray-500">
        //                             {error}. Showing a curated overview while we reconnect to the live data.
        //                         </p>
        //                     )}
        //                 </div>
        //             </div>
        //         </section>

        //         {/* Main Services */}
        //         <section className="py-30">
        //             <div className="container mx-auto px-4">
        //                 {loading && (
        //                     <p className="text-center text-gray-500">Loading services...</p>
        //                 )}

        //                 {error && !loading && (
        //                     <p className="text-center text-sm text-gray-500 mb-6">
        //                         {error}
        //                     </p>
        //                 )}

        //                 {!loading && services.length === 0 && !error && (
        //                     <p className="text-center text-gray-500">No services available at the moment.</p>
        //                 )}

        //                 {!loading && services.length > 0 && (
        //                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        //                         {services.map((srv) => {
        //                             const Icon = getIcon(srv.title);
        //                             return (
        //                                 <Card key={srv._id} className="hover-lift shadow-elegant border-border">
        //                                     <CardContent className="p-8 flex flex-col items-center text-center">
        //                                         <div className="bg-red-50 rounded-full p-4 mb-4 flex items-center justify-center shadow-sm">
        //                                             <Icon className="h-8 w-8 text-red-700 group-hover:scale-110 transition-transform" />
        //                                         </div>
        //                                         <h3 className="text-xl font-bold text-red-900 mb-2">
        //                                             {srv.title}
        //                                         </h3>
        //                                         <p className="text-gray-600 mb-4 leading-relaxed flex-1">
        //                                             {srv.description}
        //                                         </p>
        //                                         {srv.priceRange && (
        //                                             <p className="mt-2 text-red-700 font-semibold bg-red-50 rounded px-3 py-1 inline-block">
        //                                                 {srv.priceRange}
        //                                             </p>
        //                                         )}
        //                                     </CardContent>
        //                                 </Card>
        //                             );
        //                         })}
        //                     </div>
        //                 )}
        //             </div>
        //         </section>

        //         {/* Additional Features */}
        //         <section className="mx-auto px-4 py-20 w-screen relative left-1/2 -translate-x-1/2 bg-gray-100">
        //             <div className="container mx-auto px-4 max-w-4xl">
        //                 <div className="text-center mb-12">
        //                     <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
        //                     <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        //                         Additional features that set us apart from the competition
        //                     </p>
        //                 </div>

        //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        //                     {additionalFeatures.map((feature, index) => (
        //                         <Card key={index} className="hover:lift shadow-elegant border text-center">
        //                             <CardContent className="p-6">
        //                                 <div className="mt-6 w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mx-auto mb-4">
        //                                     <feature.icon className="h-6 w-6 text-maroon"/>
        //                                 </div>
        //                                 <h4 className="font-semibold mb-2">{feature.title}</h4>
        //                                 <p className="text-sm text-gray-400">{feature.description}</p>
        //                             </CardContent>
        //                         </Card>
        //                     ))}
        //                 </div>
        //             </div>
        //         </section>

        //         {/* CTA Section */}
        //         <section className="py-20">
        //             <div className="container mx-auto px-4">
        //                 <Card className="max-w-4xl mx-auto shadow-elegant border-border">
        //                     <CardContent className="p-12 text-center">
        //                         <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        //                         <p className="text-lg text-gray-500 mb-8">
        //                             Contact us today to discuss your logistics needs and ge a customized solution
        //                         </p>
        //                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
        //                             <Link to="/contact">
        //                                 <button className="bg-red-800 hover:bg-red-900 text-gray-100 px-6 py-2.5 rounded-xl">
        //                                     Contact Us
        //                                 </button>
        //                             </Link>
        //                             <Link to="/track">
        //                                 <button className="border-2 border-gray-300 rounded-xl hover:bg-red-800 hover:text-white px-6 py-2">
        //                                     Track Shipment
        //                                 </button>
        //                             </Link>
        //                         </div>
        //                     </CardContent>
        //                 </Card>
        //             </div>
        //         </section>
        //     </main>
        // </div>
    );
}


export default Services;