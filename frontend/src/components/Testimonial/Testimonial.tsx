import React, {useEffect, useState} from 'react';
import {Star} from "lucide-react";
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
  return (
      <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                      What Our Clients Say
                  </h2>
                  <p className="text-xl text-gray-600">
                      Real stories from real celebrations
                  </p>
              </div>

              <div className="relative">
                  <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-3xl p-12 shadow-xl">
                      <div className="flex justify-center mb-4">
                          {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current"/>
                          ))}
                      </div>
                      <p className="text-xl text-gray-700 mb-6 italic leading-relaxed text-center">
                          "{testimonials[activeTestimonial].text}"
                      </p>
                      <div className="text-center">
                          <p className="font-bold text-gray-900 text-lg">
                              {testimonials[activeTestimonial].name}
                          </p>
                          <p className="text-rose-500">
                              {testimonials[activeTestimonial].role}
                          </p>
                      </div>
                  </div>

                  <div className="flex justify-center mt-8 space-x-2">
                      {testimonials.map((_, index) => (
                          <button
                              key={index}
                              onClick={() => setActiveTestimonial(index)}
                              className={`w-3 h-3 rounded-full transition-all ${
                                  index === activeTestimonial
                                      ? 'bg-rose-500 w-8'
                                      : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                          />
                      ))}
                  </div>
              </div>
          </div>
      </section>
  );
}
export default Testimonial;
