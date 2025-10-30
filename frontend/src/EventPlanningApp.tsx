import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import HeroSection from "./components/HeroSection/HeroSection.tsx";
import Planning from "./components/Planning/Planning.tsx";
import Gallery from "./components/Gallery/Gallery.tsx";
import Contact from "./components/Contact/Contact.tsx";
import Footer from "./components/Footer/Footer.tsx";
import ServiceSection from "./components/ServiceSection/ServiceSection.tsx";
import Testimonial from "./components/Testimonial/Testimonial.tsx";
import Features from "./components/Features/Features.tsx";
import Cta from "./components/CTA/Cta.tsx";

interface EventPlanningAppProps {
  setShowContactModal: (show: boolean) => void;
  setShowGalleryModal: (show: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
  setScrolled: (scrolled: boolean) => void;
  scrolled: boolean;
  isMenuOpen: boolean;
  showGalleryModal: boolean;
  showContactModal: boolean;
}

const EventPlanningApp: React.FC<EventPlanningAppProps> = ({
                                      setShowContactModal,
                                      setShowGalleryModal,
                                      setScrolled,
                                      showGalleryModal,
                                      showContactModal
                                    }: EventPlanningAppProps) => {
  const [showPlanningModal, setShowPlanningModal] = useState(false);
  const user = useSelector((state: any) => state.user.isAuthenticated)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection setShowGalleryModal={setShowGalleryModal} setShowPlanningModal={setShowPlanningModal}/>

      {/* Services Section */}
      <ServiceSection/>

      {/* Features Section */}
      <Features/>

      {/* Testimonials Section */}
      <Testimonial/>

      {/* CTA Section */}
      <Cta setShowContactModal={setShowContactModal}/>

      {/* Footer */}
      <Footer setShowGalleryModal={setShowGalleryModal} />
      {/* Contact Modal*/}
      <Contact
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
      />
      {/* Gallery Modal */}
      <Gallery
          showGalleryModal={showGalleryModal}
          setShowGalleryModal={setShowGalleryModal}
      />
      {/* Planning Modal */}
      <Planning
          showPlanningModal={showPlanningModal}
          setShowPlanningModal={setShowPlanningModal}
      />
    </div>
  );
}
export default EventPlanningApp;
