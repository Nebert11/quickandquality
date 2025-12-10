import { useMemo, useState } from "react";
import API from "../api";
import { Card, CardContent } from "../components/ui/card";
import {
    Search,
    ClipboardList, 
    Truck,
    CheckCircle2,
    Package,
    Star,
} from "lucide-react";

export default function TrackShipment() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [shipment, setShipment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showTestimonialForm, setShowTestimonialForm] = useState(false);
    const [testimonialSubmitting, setTestimonialSubmitting] = useState(false);
    const [testimonialForm, setTestimonialForm] = useState({
        clientName: "",
        email: "",
        rating: 5,
        message: "",
    });

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!trackingNumber.trim()) {
            setError("Please enter a tracking number.");
            setShipment(null);
            return;
        }

        try {
            setIsLoading(true);
            const { data } = await API.get(`/shipments/${trackingNumber.trim()}`);
            setShipment(data);
            setError("");
        } catch (err) {
            const message =
                err?.response?.data?.message || "Shipment not found. Check the number and try again.";
            setError(message);
            setShipment(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitTestimonial = async (e) => {
        e.preventDefault();
        if (!testimonialForm.clientName.trim() || !testimonialForm.email.trim() || !testimonialForm.message.trim()) {
            alert("Please fill in all fields");
            return;
        }

        try {
            setTestimonialSubmitting(true);
            await API.post("/testimonials", {
                ...testimonialForm,
                trackingNumber: shipment.trackingNumber,
            });
            alert("Thank you for your feedback! Your testimonial has been submitted.");
            setTestimonialForm({ clientName: "", email: "", rating: 5, message: "" });
            setShowTestimonialForm(false);
        } catch (error) {
            alert("Failed to submit testimonial: " + error.message);
        } finally {
            setTestimonialSubmitting(false);
        }
    };

    const formattedDeliveryDate = useMemo(() => {
        if (!shipment?.estimatedDelivery) return "";
        const date = new Date(shipment.estimatedDelivery);
        return Number.isNaN(date.getTime())
            ? ""
            : date.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              });
    }, [shipment]);

    const progressSteps = useMemo(() => {
        const baseSteps = [
            {
                status: "Pending",
                title: "Pending",
                description: "We've received the shipment details and created the order.",
                icon: ClipboardList,
                color: "bg-red-600",
                lineColor: "bg-red-600",
            },
            {
                status: "In Transit",
                title: "In Transit",
                description: "Your shipment is moving through our logistics network.",
                icon: Truck,
                color: "bg-orange-600",
                lineColor: "bg-orange-600",
            },
            {
                status: "Delivered",
                title: "Delivered",
                description: "The shipment has arrived at its final destination.",
                icon: CheckCircle2,
                color: "bg-green-600",
                lineColor: "bg-green-600",
            },
            {
                status: "Collected",
                title: "Collected",
                description: "You have successfully collected your parcel.",
                icon: Package,
                color: "bg-blue-600",
                lineColor: "bg-blue-600",
            },
        ];

        if (!shipment?.status) {
            return baseSteps.map((step) => ({ ...step, completed: false, inactive: true }));
        }

        const statusIndex = baseSteps.findIndex((step) => step.status === shipment.status);

        return baseSteps.map((step, index) => ({
            ...step,
            completed: statusIndex >= index && shipment.status !== "Canceled",
            inactive: statusIndex < index,
        }));
    }, [shipment]);

    return (
        <div className="min-h-screen">
            <main className="pt-30 py-20 text-white bg-red-100/10 w-screen relative left-1/2 -translate-x-1/2">
                  {/* Hero Section */}
                <section className="max-w-6xl mx-auto px-4">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-red-900 text-center animate-fade-in">
                    <h1 className="text-5xl font-extrabold mb-6">Track Your Shipment</h1>
                    <p className="text-xl opacity-90 leading-relaxed mb-8">
                        Enter your tracking number to get real-time updates on your delivery
                    </p>
                    {error && (
                        <p className="mt-4 text-sm text-secondary-foreground">
                        {error}
                        </p>
                    )}
                    </div>
                </div>
                </section>

                {/* Tracking Form */}
                <section className="py-12">
                <div className="container mx-auto px-4">
                    <Card className="max-w-2xl mx-auto shadow-elegant border-border mt-8">
                    <CardContent className="p-8">
                        <form onSubmit={handleTrack} className="space-y-4">
                        <div>
                            <label htmlFor="trackingNumber" className="block text-sm font-medium mb-2 mt-4">
                            Tracking Number
                            </label>
                            <input
                                id="trackingNumber"
                                type="text"
                                placeholder="Enter your tracking number (e.g., QQ-1234ABCD)"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                className="w-full border border-gray-300 focus:border-gray-200 focus:ring-2 focus:ring-gray/20 transition rounded-xl text-lg py-4 px-4 text-gray-900"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-red-900 hover:bg-red-950 text-white py-3 rounded-xl text-lg font-semibold transition disabled:opacity-70"
                        >
                            <Search className="h-5 w-5" />
                            {isLoading ? "Searching..." : "Track Shipment"}
                        </button>
                        </form>
                        {error && (
                        <p className="text-sm text-destructive mt-4 text-center">
                            {error}
                        </p>
                        )}
                    </CardContent>
                    </Card>
                </div>
                </section>

                {/* Tracking Results */}
                {shipment && (
                <section className="py-12 bg-red-800">
                    <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Card className="shadow-elegant border-border mb-6">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">
                                Tracking Number: {shipment.trackingNumber}
                                </h2>
                                {formattedDeliveryDate ? (
                                <p className="text-muted-foreground">
                                    Estimated Delivery: {formattedDeliveryDate}
                                </p>
                                ) : (
                                <p className="text-muted-foreground">
                                    Estimated delivery will appear once available.
                                </p>
                                )}
                            </div>
                            <div className="px-4 py-2 bg-red-200 rounded-lg">
                                <span className="text-red-700 font-semibold">{shipment.status}</span>
                            </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                <span className="font-semibold">Origin:</span>
                                <span className="text-red-800">
                                    {shipment.origin ?? "To be confirmed"}
                                </span>
                                </div>
                                <div className="flex items-center justify-between">
                                <span className="font-semibold">Destination:</span>
                                <span className="text-red-800">
                                    {shipment.destination ?? "To be confirmed"}
                                </span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                <span className="font-semibold">Sender:</span>
                                <span className="text-muted-foreground">
                                    {shipment.senderName ?? "Not provided"}
                                </span>
                                </div>
                                <div className="flex items-center justify-between">
                                <span className="font-semibold">Receiver:</span>
                                <span className="text-red-800">
                                    {shipment.receiverName ?? "Not provided"}
                                </span>
                                </div>
                            </div>
                            </div>

                            <div className="space-y-6">
                            {progressSteps.map((step, index) => (
                                <div key={step.status} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                                        step.completed
                                        ? step.color
                                        : step.inactive 
                                        ? "bg-gray-300"
                                        : step.color
                                    }`}
                                    >
                                    <step.icon className="h-6 w-6" />
                                    </div>
                                    {index < progressSteps.length - 1 && (
                                    <div
                                        className={`w-0.5 h-16 ${
                                        step.completed ? step.lineColor : "bg-gray-300"
                                        }`}
                                    ></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-8">
                                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                                    <p className="text-muted-foreground mb-1">{step.description}</p>
                                </div>
                                </div>
                            ))}
                            </div>
                        </CardContent>
                        </Card>

                        <Card className="shadow-elegant border-border">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Shipment Notes</h3>
                            {shipment.details ? (
                            <p className="text-muted-foreground whitespace-pre-line">{shipment.details}</p>
                            ) : (
                            <p className="text-muted-foreground">
                                We&apos;ll add detailed updates as soon as they are available.
                            </p>
                            )}
                            <button className="rounded-xl mt-6 border border-gray-300 px-4 py-2 hover:bg-gray-50 transition">
                                Contact Support
                            </button>
                        </CardContent>
                        </Card>

                        <Card className="shadow-elegant border-border">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Share Your Experience</h3>
                            <p className="text-muted-foreground mb-4">
                                Help us improve by sharing your feedback about your delivery experience.
                            </p>
                            
                            {showTestimonialForm ? (
                                <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Your Name</label>
                                        <input
                                            type="text"
                                            value={testimonialForm.clientName}
                                            onChange={(e) => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={testimonialForm.email}
                                            onChange={(e) => setTestimonialForm({ ...testimonialForm, email: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })}
                                                    className="transition"
                                                >
                                                    <Star
                                                        className={`h-6 w-6 ${
                                                            star <= testimonialForm.rating
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-gray-300"
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Your Feedback</label>
                                        <textarea
                                            value={testimonialForm.message}
                                            onChange={(e) => setTestimonialForm({ ...testimonialForm, message: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none"
                                            rows="4"
                                            placeholder="Tell us about your experience..."
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={testimonialSubmitting}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                                        >
                                            {testimonialSubmitting ? "Submitting..." : "Submit Review"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowTestimonialForm(false)}
                                            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setShowTestimonialForm(true)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Leave a Review
                                </button>
                            )}
                        </CardContent>
                        </Card>
                    </div>
                    </div>
                </section>
                )}

                {/* Infor Section */}
                {!shipment && (
                    <section className=" mx-auto px-4 py-20 w-screen relative left-1/2 -translate-x-1/2 bg-gray-100">
                        <div className="container max-w-6xl mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-3xl font-bold mb-8 text-center text-black">How To Track</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card className="shadow-elegant border text-center">
                                        <CardContent className="p-6">
                                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 mt-4">
                                                <span className="text-2xl font-bold text-red-900">1</span>
                                            </div>
                                            <h3 className="font-semibold mb-2">Enter Number</h3>
                                            <p className="text-sm text-gray-400">Type your Tracking Number in the field above</p>
                                        </CardContent>
                                    </Card>

                                    <Card className="shadow-elegant border text-center">
                                        <CardContent className="p-6">
                                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 mt-4">
                                                <span className="text-2xl font-bold text-red-900">2</span>
                                            </div>
                                            <h3 className="font-semibold mb-2">Click track</h3>
                                            <p className="text-sm text-gray-400">Hit the track button to search for your shipment</p>
                                        </CardContent>
                                    </Card>

                                    <Card className="shadow-elegant border text-center">
                                        <CardContent className="p-6">
                                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 mt-4">
                                                <span className="text-2xl font-bold text-red-900">3</span>
                                            </div>
                                            <h3 className="font-semibold mb-2">View Status</h3>
                                            <p className="text-sm text-gray-400">Get real updates on your package location</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};