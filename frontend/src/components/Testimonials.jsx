import { Star } from "lucide-react";
import { Card, CardContent} from "../components/ui/card"
import { useState, useEffect } from "react";
import API from "../api";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data } = await API.get("/testimonials");
            setTestimonials(data);
        } catch (error) {
            console.log("Failed to fetch testimonials");
            // Fallback to empty array if API fails
            setTestimonials([]);
        }
        setLoading(false);
    };

    // Only display testimonials fetched from the API (approved by admin)
    const displayTestimonials = testimonials;

    return (
        <section className="py-20 bg-gray-100 w-screen relative left-1/2 -translate-x-1/2">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">Trusted by businesses worldwide for reliable logistics solutions</p>
                </div>

                {/* Show message when no testimonials available */}
                {!loading && displayTestimonials.length === 0 && (
                    <p className="text-center text-gray-500 mb-8">No testimonials available yet.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayTestimonials.map((testimonial, index) => {
                        const numericRating = Number(testimonial.rating);
                        const safeRating = Number.isFinite(numericRating)
                            ? Math.max(0, Math.round(numericRating))
                            : 0;
                        return (
                        <Card key={index} className="hover-lift shadow-elegant border-border">
                            <CardContent className="p-6 mt-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(safeRating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-red-900 text-maroon" />
                                    ))}
                                </div>
                                <p className="text-black mb-4 italic">{testimonial.message || testimonial.content}</p>
                                <div>
                                    <p className="font-semibold text-gray-700">{testimonial.clientName || testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.company || "Quick & Quality Client"}</p>
                                </div>
                            </CardContent>
                        </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Testimonials;