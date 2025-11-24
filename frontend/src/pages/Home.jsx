import { Link } from "react-router-dom";
import heroImage from "../assets/hero-courier.jpg";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import ServicesPreview from "../components/ServicesPreview";

function Home () {
    return ( 
        <div>
            <section className="relative left-1/2 -translate-x-1/2 w-screen bg-maroon min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={heroImage} className="w-full h-full obkject-cover" />
                    <div className="absolute inset-0 bg-red-900 opacity-90"></div>
                </div>
                {/* Main content*/}
                <div className="container mx-auto px-6 py-12 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <span className="text-xl font-semibold text-gray-100">Quick And Quality</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">Delivering Beyond <br /> <span className="text-red-600">Borders</span></h1>
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

            <section>
                <Stats />
            </section>

            <section>
                <ServicesPreview />
            </section>

            <section>
                <Testimonials/>
            </section>

        </div>
 
    );   
};

export default Home;