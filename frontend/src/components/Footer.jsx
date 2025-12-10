import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.svg";

const Footer = () => {
    return (
        <footer className="bg-maroon text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src={logo} alt="Quick and Quality" className="h-12 w-auto"/>
                        </div>
                        <p className="text-sm opacity-90 mb-4">Delivering Beyond Borders - Your trusted partner for international courier and logistics services.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            <li><Link to="/" className="hover:opacity-100 transition-opacity">Home</Link></li>
                            <li><Link to="/track" className="hover:opacity-100 transition-opacity">Track Shipment</Link></li>
                            <li><Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link></li>
                            <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
                            <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold mb-4">Our Services</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            <li>International Shipping</li>
                            <li>Same-Day Delivery</li>
                            <li>E-commerce Fulfillment</li>
                            <li>Customes Clearance</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            <li className="flex items-start gap-2">
                                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>+2547-01-234-567</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>info@quickandquality.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>123 Moi Avenue, Nairobi Kenya</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-red-800 mt-8 pt-8 text-center text-sm opacity-90">
                    <p>&copy; {new Date().getFullYear()} Quick & Quality. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
    
};

export default Footer;