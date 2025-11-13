import {ChevronRight} from "lucide-react";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

interface HeroSectionProps {
    setShowPlanningModal: (show: boolean) => void;
    setShowGalleryModal: (show: boolean) => void;
}
const HeroSection = ({ setShowGalleryModal, setShowPlanningModal }) => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <section
            id={"home"}
            className="relative h-screen flex items-center justify-center"
            style={{
                backgroundImage: `url('/image3.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>

            <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Creating Unforgettable
                    <span className="block mt-2 bg-gradient-to-r from-rose-200 to-purple-200 bg-clip-text text-transparent">
                      Moments That Last
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 opacity-90">
                    From intimate gatherings to grand celebrations, we bring your vision to life
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() =>
                            navigate('/login', { state: { from: location.pathname } })
                        }
                        className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-rose-50 transition-all transform hover:scale-105 shadow-xl"
                    >
                        Start Planning
                        <ChevronRight className="inline ml-2 h-5 w-5"/>
                    </button>
                    <button
                        onClick={() => setShowGalleryModal(true)}
                        className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-rose-600 transition-all transform hover:scale-105"
                    >
                        View Our Work
                    </button>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>
    );
}
export default HeroSection;
