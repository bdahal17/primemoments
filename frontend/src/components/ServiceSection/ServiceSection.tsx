import React from 'react';
import {Calendar, Heart, Sparkles} from "lucide-react";
interface ServiceSectionProps {

}
const ServiceSection: React.FC<ServiceSectionProps> = ({}: ServiceSectionProps) => {
    const services = [
        {
            icon: Heart,
            title: "Weddings",
            description: "From intimate ceremonies to grand celebrations, we create your perfect day with attention to every detail."
        },
        {
            icon: Sparkles,
            title: "Corporate Events",
            description: "Professional conferences, team building, and corporate gatherings that leave lasting impressions."
        },
        {
            icon: Calendar,
            title: "Special Occasions",
            description: "Birthdays, anniversaries, and milestone celebrations crafted to reflect your unique story."
        }
    ];

    return (
        <section id={"services"} className="py-24 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive event planning and coordination for every occasion
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-purple-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div
                                    className="bg-gradient-to-br from-rose-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Icon className="h-8 w-8 text-white"/>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
export default ServiceSection;
