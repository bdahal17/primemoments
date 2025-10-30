import React from 'react';
import {CheckCircle} from "lucide-react";
interface FeaturesProps {

}
const Features: React.FC<FeaturesProps> = ({}: FeaturesProps) => {

    const features = [
        "All-inclusive packages",
        "Customized planning",
        "Experienced coordinators",
        "Stunning venues",
        "Vendor management",
        "Day-of coordination"
    ];

    return (
        <section id={"about"} className="py-24 px-4 bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Why Choose Us
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            We handle every detail with precision and creativity, ensuring your event is flawlessly
                            executed from start to finish.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <CheckCircle className="h-6 w-6 text-rose-500 flex-shrink-0"/>
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div
                            className="aspect-square rounded-3xl bg-gradient-to-br from-rose-400 via-purple-400 to-indigo-400 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"></div>
                        <div
                            className="absolute inset-4 rounded-3xl bg-white shadow-xl flex items-center justify-center">
                            <div className="text-center p-8">
                                <div
                                    className="text-6xl font-bold text-transparent bg-gradient-to-br from-rose-500 to-purple-500 bg-clip-text mb-4">
                                    10+
                                </div>
                                <p className="text-xl font-semibold text-gray-700">Years of Excellence</p>
                                <p className="text-gray-600 mt-2">Creating unforgettable moments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Features;
