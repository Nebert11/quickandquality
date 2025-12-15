import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "../assets/hero-courier.jpg";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import ServicesPreview from "../components/ServicesPreview"; 

import image1 from "../assets/1.jpg";
import image2 from "../assets/4.png";
import image3 from "../assets/5.jpg";
import image4 from "../assets/moving.png";
import image5 from "../assets/6.png";
import image6 from "../assets/3.png";
import image7 from "../assets/2.png";
import image8 from "../assets/7.png";

function Home () {
     const galleryImages = [
        { src: image1, alt: "Fleet 1", caption: "Fleet & Vehicles" },
        { src: image2, alt: "Fleet 2", caption: "Same-day Delivery" },
        { src: image3, alt: "Operations 1", caption: "Countrywide Delivery" },
        { src: image4, alt: "Operations 2", caption: "Office/Home items Moving" },
        { src: image5, alt: "Operations 3", caption: "Packing & Dispatch" },
        { src: image6},
        { src: image7},
        { src: image8},
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, galleryImages.length]);

    const goToImage = (index) => {
        setCurrentImageIndex(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000);
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000);
    };

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
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-10"></div>
            </section>

            {/* Gallery Carousel */}
            <section className="py-8 sm:py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center text-shadow-purple-900">Gallery</h2>
                    <p className="text-center text-gray-500 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">A few shots of our fleet and operations.</p>

                    <div className="max-w-6xl mx-auto">
                        <div 
                            className="relative rounded-lg overflow-hidden shadow-lg bg-gray-200"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Current Image */}
                            <div className="relative w-full h-48 sm:h-64 md:h-180">
                                <img 
                                    src={galleryImages[currentImageIndex].src} 
                                    alt={galleryImages[currentImageIndex].alt}
                                    className="w-full h-full object-cover"
                                />
                                {/* Image Caption */}
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3 sm:p-4">
                                    <p className="text-white text-sm sm:text-base md:text-lg font-semibold">{galleryImages[currentImageIndex].caption}</p>
                                </div>
                            </div>

                            {/* Previous Button */}
                            <button
                                onClick={goToPrevious}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 sm:p-2 rounded-full transition-all z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={goToNext}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 sm:p-2 rounded-full transition-all z-10"
                                aria-label="Next image"
                            >
                                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Dots Navigation */}
                        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                            {galleryImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`rounded-full transition-all ${
                                        index === currentImageIndex 
                                            ? "bg-red-700 w-6 sm:w-8 h-2.5 sm:h-3" 
                                            : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 hover:bg-gray-400"
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Image Counter */}
                        <p className="text-center text-gray-600 mt-3 sm:mt-4 text-xs sm:text-sm">
                            {currentImageIndex + 1} of {galleryImages.length}
                        </p>
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