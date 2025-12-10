import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import API from "../api";
import { Clock, MapPin, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

// Initialize EmailJS with your public key from environment
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

export default function Contact () {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: ""});
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Send email to business if EmailJS is configured
            if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        to_email: "quickandquality20@gmail.com",
                        client_name: form.name,
                        client_email: form.email,
                        client_phone: form.phone,
                        client_message: form.message,
                        reply_to: form.email,
                    }
                );
            }

            // Save contact to backend
            const { data } = await API.post("/contact", form);
            
            setSuccess("✓ Message sent successfully! We'll get back to you within 24 hours.");
            setForm({ name: "", email: "", phone: "", message: "" });

            // Clear success message after 5 seconds
            setTimeout(() => setSuccess(""), 5000);
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to send message. Please try again or contact us directly.");
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Phone",
            content: "+254790814158",
            link: "tel:+254790814158",
        },
        {
            icon: Mail,
            title: "Email",
            content: "quickandquality20@gmail.com",
            link: "mailto:quickandquality20@gmail.com",
        },
        {
            icon: MapPin,
            title: "Address",
            content: "123 Moi Avenue, Nairobi Kenya",
            link: "https://maps.google.com",
        },
        {
            icon: Clock,
            title: "Business Hours",
            content: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
            link: null,
        }, 
    ];

    return (
        <div className="min-h-screen">
            <main className="pt-20 bg-[linear-gradient(135deg,hsl(0,100%,20%)_0%,hsl(0,100%,30%)_100%">
                <section className="py-20 bg text">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center text-red-800 animate-fade-in">
                            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
                            <p className="text-xl opacity-90 leading-relaxed">
                                Have a question or need assistance? We're here to help you with all your logistics and shipping needs.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className="py-12 bg-">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {contactInfo.map(( info, index ) => (
                                <Card
                                    key={index} 
                                    className="hover-lift shadow-elegant border text-center">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mx-auto mt-4 mb-4">
                                            <info.icon className="h-6 w-6 text-red-800" />
                                        </div>
                                        <h3 className="font-semibold mb-2">{info.title}</h3>
                                        {info.link ? (
                                            <a href={info.link} className="text-gray-400 hover-text-red-800 transition-colors">
                                                {info.content}
                                            </a>
                                        ) : (
                                            <p className="text-gray-400">{info.content}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="py-12 bg-[hsl:(0 0% 95%)] w-screen relative left-1/2 -translate-x-1/2">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                                <p className="text-gray-500">
                                    Fill out below and we'll get back to you within 24 hours
                                </p>
                            </div>
                        </div>

                        <Card className="shadow-elegant">
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                                                Full Name
                                            </label>
                                            <input 
                                                id="contact-name"
                                                name="name"
                                                type="text" 
                                                required 
                                                placeholder="Your Name"
                                                value={form.name} 
                                                onChange={handleChange} 
                                                className="rounded-xl border px-3 py-2 w-full" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                                                Email Address
                                            </label>
                                            <input 
                                                id="contact-email"
                                                name="email"
                                                type="email" 
                                                required 
                                                placeholder="Your Email"
                                                value={form.email} 
                                                onChange={handleChange} 
                                                className="rounded-xl border px-3 py-2 w-full" 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">
                                            Phone Number
                                        </label>
                                        <input 
                                            id="contact-phone"
                                            name="phone"
                                            type="tel" 
                                            required 
                                            placeholder="Your Phone Number"
                                            value={form.phone} 
                                            onChange={handleChange} 
                                            className="rounded-xl border px-3 py-2 w-full" 
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea 
                                            id="contact-message"
                                            name="message"
                                            required 
                                            placeholder="Tell us how we can help you..."
                                            value={form.message} 
                                            onChange={handleChange} 
                                            className="min-h-[150px] rounded-xl border px-3 py-2 w-full" 
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="bg-red-900 text-white text-lg font-bold rounded-xl px-4 py-3 w-full disabled:opacity-60 disabled:cursor-not-allowed transition"
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                    </button>
                                </form>

                                {success && (
                                    <p className="text-green-600 mt-4 text-center font-semibold">
                                        {success}
                                    </p>
                                )}

                                {error && (
                                    <p className="text-red-600 mt-4 text-center font-semibold">
                                        {error}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
        </div>
    );
}
