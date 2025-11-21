import { Star } from "lucide-react";
import { Card, CardContent} from "../components/ui/card"

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Omutse",
            company: "Tech Innovations Inc.",
            content: "Quick & Quality has transformed our international shipping. Fast, reliable, and excellent customer service every time.",
            rating: 5,
        },
        {
            name: "Joshua Kabiru",
            company: "Pioneer Enterprises",
            content: "Their e-commerce fulfillment service is outstanding. Our customers are happier than ever with the delivery speed.",
            rating: 4.5,
        },
        {
            name: "Emilly Kabishu",
            company: "Fashion Boutique Co.",
            content: "Same-day delivery service is a game-changer for our business. Professional team and seamless process.",
            rating: 5,
        },
    ];

    return (
        <section className="py-20 bg-gray-100 w-screen relative left-1/2 -translate-x-1/2">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">Trusted by businesses worldwide for reliable logistics solutions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => {
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
                                <p className="text-black mb-4 italic">{testimonial.content}</p>
                                <div>
                                    <p className="font-semibold text-gray-700">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.company}</p>
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