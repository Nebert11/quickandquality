import { Link } from "react-router-dom";
import heroImage from "../assets/hero-courier.jpg";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import ServicesPreview from "../components/ServicesPreview"; 

import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";

function Home () {
     const galleryImages = [
        { src: image1, alt: "Fleet 1", caption: "Fleet & Vehicles" },
        { src: image2, alt: "Fleet 2", caption: "Same-day Delivery" },
        { src: image3, alt: "Operations 1", caption: "Fulfillment Center" },
        { src: image4, alt: "Operations 2", caption: "Customs & Docs" },
        { src: image5, alt: "Operations 3", caption: "Packing & Dispatch" },
    ];

    return ( 
        <div>
            <section className="relative left-1/2 -translate-x-1/2 w-screen bg-maroon min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={heroImage} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-yellow-700 opacity-90"></div>
                </div>
                {/* Main content*/}
                <div className="container mx-auto px-6 py-12 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <span className="text-2xl font-semibold text-purple-400">Quick And Quality</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">Delivering Beyond <br /> <span className="text-purple-600">Borders</span></h1>
                    <p className="text-xl text-gray-100 leading-tight mt-4">Fast, reliable, and secure delivery across Kenya and beyond. Same-day delivery in Nairobi and international coverage for all your shipping needs.</p>

                    <div className="flex flex-wrap gap-4 pt-6">
                        <Link 
                            to="/track"
                            className="border-2 border-white p-4 rounded-xl text-white py-6 px-8 font-semibold hover:bg-white hover:text-red-900 hover:scale-105 transition-all"
                        >
                            Track Your Shipment
                        </Link>

                        <Link 
                            to="/services"
                            className="border-2 border-white p-4 rounded-xl text-white py-6 px-8 font-semibold hover:bg-white hover:text-red-900 hover:scale-105 transition-all"
                        >
                            Our Services
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
            </section>

            {/* Gallery*/}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
                    <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">A few shots of our fleet and operations.</p>

                    <div className="max-w-6xl mx-auto">
                    {/* Marquee / continuous slideshow */}
                    <style>{`
                        .qaq-marquee { overflow: hidden; }
                        .qaq-marquee__inner { display: flex; gap: 1.5rem; align-items: center; }
                        @keyframes qaq-scroll-left {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                        }
                        .qaq-marquee__inner { animation: qaq-scroll-left 20s linear infinite; }
                        .qaq-marquee:hover .qaq-marquee__inner, .qaq-marquee:focus-within .qaq-marquee__inner { animation-play-state: paused; }
                    `}</style>

                    <div className="qaq-marquee relative">
                        <div className="qaq-marquee__inner">
                        {galleryImages.concat(galleryImages).map((g, i) => (
                            <figure key={i} className="shrink-0 rounded-lg overflow-hidden shadow-md" tabIndex={0}>
                            <img src={g.src} alt={g.alt} className="h-48 w-auto object-cover block" />
                            </figure>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
            </section>

            <section>
                <ServicesPreview />
            </section>

            <section>
                <Stats />
            </section>

            <section>
                <Testimonials/>
            </section>

        </div>
 
    );   
};

export default Home;