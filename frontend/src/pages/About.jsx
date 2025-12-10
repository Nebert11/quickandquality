import { Badge, Circle, Eye, Globe, Medal } from "lucide-react"
import Image from "../assets/hero-courier.jpg"
import { Card, CardContent } from "../components/ui/card"

export default function About () {
    const missionVision = [
        {
            icon: Globe,
            title: "Our Mission",
            description: "To provide fast, reliable, and innovative logistics solutions that empower businesses to grow and succeed in the global marketplace. We are committed to delivering excellence in every shipment while maintaining the highest standards of customer service."
        },
        {
            icon: Eye,
            title: "Our Vision",
            description: "To be the world's most trusted logistics partner, known for our commitment to quality, innovation, and sustainability. We envision a future where international commerce flows seamlessly, connecting businesses and communities across every border."
        }
    ]

    const coreValues = [
        {
            icon: Circle,
            title: "Speed",
            description: "Lightning-fast delivery times without compromising quality"
        },
        {
            icon: Medal,
            title: "Reliability",
            description: "Consistent on-time deliveries you can count on"
        },
        {
            icon: Globe,
            title: "Global Reach",
            description: "Serving over 150 countries with local expertise"
        }
    ];

    return (
        <main className="relative left-1/2 -translate-x-1/2 w-screen min-h-[90vh] items-center overflow-hidden">
            <section className="py-20">
                <div className="container pt-6 mx-auto">
                    <div className="max-w-2xl mx-auto text-center text-red-800 animate-fade-in mt-4 mb-10">
                        <h2 className="font-bold text-5xl text-red-800">About Quick & Quality</h2>
                        <p className="text-red-900 text-xl opacity-90 mt-4">Your trusted partner in international courier and logistics services, 
                            connecting businesses and people across borders for over 25 years.
                        </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-red-900">
                        <img src={Image} className="shadow rounded"/>
                    </div>
                    
                    <div className="">
                        <p className="text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt animi sequi harum sunt maxime, 
                            libero non, minima doloremque officia obcaecati adipisci dolorum possimus eligendi. A, animi? Nemo, 
                            laboriosam quam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt animi sequi harum sunt maxime, 
                            libero non, minima doloremque officia obcaecati adipisci dolorum possimus eligendi. A, animi? Nemo, 
                            laboriosam quam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt animi sequi harum sunt maxime, 
                            libero non, minima doloremque officia obcaecati adipisci dolorum possimus eligendi. A, animi? Nemo, 
                            laboriosam quam. 
                        </p>
                    </div>
                </div>
                {/* Mission, Vision Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mt-6">
                    {missionVision.map((feature, index) => (
                        <Card key={index} className="hover-lift shadow border">
                            <CardContent className="p-6">
                                <div className="bg-red-50 mt-6 w-12 h-12 rounded-lg flex items-center justify-center">
                                    <feature.icon className="h-6 w-6 text-red-900"/>
                                </div>
                                <h4 className="font-semibold mb-2 text-red-900 text-3xl">{feature.title}</h4>
                                <p>{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Core Values */}
                <div className="bg-gray-100 mt-10">
                    <div className="text-center mb-8">
                        <h2 className="font-bold text-4xl text-red-900">Our Core Values</h2>
                        <p className="text-gray-500 text-xl">The principles that guide everything we do</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 max-w-6xl mx-auto gap-6">
                        {coreValues.map((value, index) => (
                            <Card key={index} className="text-center mb-4">
                                <CardContent className="p-6">
                                    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 mt-8">
                                        <value.icon className="text-red-900 h-8 w-8"/>
                                    </div>   
                                    <h4 className="font-semibold text-2xl text-red-900 mb-2">{value.title}</h4>                             
                                    <p>{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
        </main>
    )
}