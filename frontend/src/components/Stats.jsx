import { Globe, Clock, Users, Award } from "lucide-react";

const Stats = () => {
    const stats = [
        {
            icon: Globe,
            value: "150+",
            label: "Countries Served",
            color: "text-red-900",
        },
        {
            icon: Clock,
            value: "98%",
            label: "On-Time Deliveries",
            color: "text-red-900",
        },
        {
            icon: Users,
            value: "50K+",
            label: "Happy Clients",
            color: "text-red-900",
        },
        {
            icon: Award,
            value: "4.9/5",
            label: "Average Rating",
            color: "text-red-900",
        },
    ];

    return (
        <section className="py-20 bg-gray-100 w-screen relative left-1/2 -translate-x-1/2">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stats, index) => (
                        <div key={index} className="text-center animate-fade-in" 
                            style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                                <stats.icon className={`h-8 w-8 ${stats.color}`}/>
                            </div>
                            <h3 className="text-4xl font-bold text-red-900 mb-2">{stats.value}</h3>
                            <p className="text-gray-500 font-medium">{stats.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Stats;