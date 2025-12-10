import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import {
  Clock,
  Globe,
  Truck,
  Shield,
  Package,
  FileCheck,
  Zap,
} from "lucide-react";

const Services = () => {
  // SIMPLE services array
  const services = [
    {
      key: "international",
      Icon: Globe,
      title: "International Shipping",
      description:
        "Fast and secure delivery to over 150 countries worldwide with real-time tracking and customs support.",
      features: [
        "Express and economy options",
        "Door-to-door delivery",
        "Real-time tracking",
        "Insurance coverage",
      ],
      
    },
    {
      key: "same-day",
      Icon: Zap,
      title: "Same-Day Delivery (Nairobi)",
      description:
        "Ultra-fast delivery within Nairobi and surrounding areas. Get your packages delivered on the same day.",
      features: [
        "Pick up within 2 hours",
        "Delivery within 24 hours",
        "Live GPS tracking",
        "Priority handling",
      ],
      
    },
    {
      key: "moving",
      Icon: Truck,
      title: "Home/Office Moving",
      description:
        "Reliable and stress-free moving services for homes & offices across Nairobi and Kenya—covering packing, loading, & safe delivery.",      
      features: [
        "Professional packing & wrapping",
        "Safe loading and unloading",
        "Secure transportation",
        "Furniture disassembly & reassembly",
      ],
    },
    {
      key: "customs",
      Icon: FileCheck,
      title: "Customs Clearance Assistance",
      description:
        "Get help with customs documentation and clearance procedures.",
      features: [
          "Document preparation",
          "Duty calculation",
          "Compliance support",
          "Expedited processing",
      ],
      
    },
  ];

  const additionalFeatures = [
    {
      icon: Truck,
      title: "Fleet Management",
      description: "Modern fleet with packing services",
    },
    {
      icon: Shield,
      title: "Insuarance Options",
      description: "Complehensive coverage plans",
    },
    {
      icon: Package,
      title: "Secure Packaging",
      description: "Professional packing services",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round the clock customer service",
    },
  ];

 

  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-red-800 animate-fade-in">
              <h1 className="text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-gray-500 opacity-90 leading-relaxed">
                Comprehensive logistics solutions designed to meet all your 
                shipping and delivery needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* MAIN SERVICES */}
        <section className="py-20 "> 
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {services.map((service) => (
                <Card
                  key={service.key}
                  className="relative w-full group h-[350px] rounded-xl overflow-hidden cursor-pointer shadow-lg"
                >
                  <CardContent className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                    <div className="absolute inset-0 z-10 bg-gray-100 group-hover:bg-opacity-50 transition-all duration-500"></div>
                    <div className="relative z-20 p-5 text-black">
                      <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center mt-8 mb-4">
                        <service.Icon className="h-8 w-8 text-red-900 " />
                      </div>
                      
                      <h3 className="text-2xl text-red-950 font-bold mb-2">{service.title}</h3>

                      <p className="text-red-800 mb-3 leading-relaxed">
                        {service.description}
                      </p>
                      {service.features && (
                        <div className="space-y-1 text-sm">
                        {service.features.map((feature, i) => (
                          <div key={feature} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-900 mt-2 shrink-0"></div>
                            <span className="">{feature}</span>
                          </div>
                        ))}
                      </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        

        {/*Additional Features */}
        <section className="py-20 bg-gray-50 w-screen relative left-1/2 -translate-x-1/2">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Additional features that set us apart from the competition
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {additionalFeatures.map((feature, index) => (
                <Card 
                  key={index} 
                  className="hover-lift shadow border text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mx-auto mb-4 mt-4">
                      <feature.icon className="h-6 w-6 text-red-900" />
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 w-screen relative left-1/2 -translate-x-1/2">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className=" mx-auto shadow border">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-gray-500 mb-8">
                Contact us today to discuss your logistics needs and get a customized solution
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <button className="bg-red-900 hover:bg-red-700 text-white px-8 py-2 rounded-xl">
                      Contact Us
                    </button>
                  </Link>

                  <Link to="/track">
                    <button className="border-2 border-gray-100 px-8 py-2 bg-gray-100 rounded-xl">
                      Track Shipment
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
