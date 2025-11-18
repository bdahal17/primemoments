import React, {useEffect, useState} from 'react';
import {CheckCircle, Star} from "lucide-react";
interface TestimonialProps {

}
const Testimonial: React.FC<TestimonialProps> = ({}: TestimonialProps) => {
    const testimonials = [
        {
            name: "Sarah Mitchell",
            role: "Bride",
            text: "Our wedding was absolutely magical! Every detail was perfect, and the team made the entire planning process stress-free and enjoyable. We couldn't have asked for a better experience.",
            rating: 5
        },
        {
            name: "David Chen",
            role: "Corporate Client",
            text: "The annual gala exceeded all expectations. Professional, creative, and flawlessly executed. Our guests are still talking about it months later!",
            rating: 5
        },
        {
            name: "Emily Rodriguez",
            role: "Anniversary Celebration",
            text: "They turned our vision into reality and then some. The venue was stunning, the coordination seamless, and the memories will last forever.",
            rating: 5
        }
    ];

    const [activeTestimonial, setActiveTestimonial] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const features = [
        "All-inclusive packages",
        "Customized planning",
        "Experienced coordinators",
        "Stunning venues",
        "Vendor management",
        "Day-of coordination"
    ];

    return (
        <section
            id={"about"}
            className="py-24 px-4 bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div
                            className="aspect-square rounded-3xl bg-black shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                            style={{
                                backgroundImage: 'url("img-1.jpg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                        <div
                            className="absolute inset-4 rounded-3xl bg-white shadow-xl flex items-center justify-center"
                            style={{
                                backgroundImage: 'url("img-1.jpg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="text-center p-8">
                                <div
                                    className="text-6xl font-bold text-transparent bg-gradient-to-br from-rose-500 to-purple-500 bg-clip-text mb-4">
                                    {/*10+*/}
                                </div>
                                {/*<p className="text-xl font-semibold text-gray-700">Years of Excellence</p>*/}
                                {/*<p className="text-gray-600 mt-2">Creating unforgettable moments</p>*/}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            What Our Clients Say
                        </h2>
                        {/*<p className="text-xl text-gray-600 mb-8">*/}
                        {/*    We handle every detail with precision and creativity, ensuring your event is flawlessly*/}
                        {/*    executed from start to finish.*/}
                        {/*</p>*/}

                        <p className="text-xl text-black-200 mb-6 italic leading-relaxed text-center">
                            "{testimonials[activeTestimonial].text}"
                        </p>
                        <div className="text-center">
                            <p className="font-bold text-black-200 text-lg">
                                {testimonials[activeTestimonial].name}
                            </p>
                            <p className="text-rose-500">
                                {testimonials[activeTestimonial].role}
                            </p>
                        </div>
                        {/*<div className="grid grid-cols-2 gap-4">*/}
                        {/*    {features.map((feature, index) => (*/}
                        {/*        <div key={index} className="flex items-center space-x-2">*/}
                        {/*            <CheckCircle className="h-6 w-6 text-rose-500 flex-shrink-0"/>*/}
                        {/*            <span className="text-gray-700 font-medium">{feature}</span>*/}
                        {/*        </div>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                    </div>

                </div>
            </div>
        </section>
    )
}
export default Testimonial;
