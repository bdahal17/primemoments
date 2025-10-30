import React from 'react';
import {ChevronRight} from "lucide-react";
interface CtaProps {
    setShowContactModal: (value: boolean) => void;
}
const Cta: React.FC<CtaProps> = ({ setShowContactModal }: CtaProps) => {
    return (
        <section
            className="py-24 px-4 bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Start Planning?
                </h2>
                <p className="text-xl text-white opacity-90 mb-8">
                    Let's create something extraordinary together. Contact us today for a free consultation.
                </p>
                <button
                    onClick={() => setShowContactModal(true)}
                    className="bg-white text-rose-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-rose-50 transition-all transform hover:scale-105 shadow-2xl"
                >
                    Get In Touch
                    <ChevronRight className="inline ml-2 h-5 w-5"/>
                </button>
            </div>
        </section>
    );
}
export default Cta;
