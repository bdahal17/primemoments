import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, Sparkles, ChevronRight, Menu, X, Star, CheckCircle, Mail, Phone, User, MessageSquare, DollarSign, Users } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function EventPlanningApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showPlanningModal, setShowPlanningModal] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [planningFormData, setPlanningFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    message: ''
  });
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [planningFormSubmitted, setPlanningFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const features = [
    "All-inclusive packages",
    "Customized planning",
    "Experienced coordinators",
    "Stunning venues",
    "Vendor management",
    "Day-of coordination"
  ];

  const galleryItems = [
    {
      title: "Elegant Garden Wedding",
      description: "A beautiful outdoor ceremony with 200 guests, featuring custom floral arrangements and a stunning reception under the stars.",
      category: "Wedding"
    },
    {
      title: "Corporate Innovation Summit",
      description: "Annual tech conference for 500 attendees with keynote speakers, breakout sessions, and networking events.",
      category: "Corporate"
    },
    {
      title: "50th Anniversary Gala",
      description: "Intimate celebration for 100 guests with live jazz band, custom menu, and personalized decor honoring 50 years of love.",
      category: "Anniversary"
    },
    {
      title: "Lakeside Wedding Reception",
      description: "Romantic waterfront wedding with 150 guests, featuring sunset ceremony and elegant dinner reception.",
      category: "Wedding"
    },
    {
      title: "Product Launch Event",
      description: "High-energy product reveal for 300 attendees with interactive demos, entertainment, and catered cocktail reception.",
      category: "Corporate"
    },
    {
      title: "Sweet Sixteen Party",
      description: "Glamorous birthday celebration for 80 guests with DJ, photo booth, custom cake, and themed decorations.",
      category: "Birthday"
    }
  ];

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlanningInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlanningFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactFormData);
    setContactFormSubmitted(true);
    setTimeout(() => {
      setShowContactModal(false);
      setContactFormSubmitted(false);
      setContactFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 2000);
  };

  const handlePlanningSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Planning form submitted:', planningFormData);
    setPlanningFormSubmitted(true);
    setTimeout(() => {
      setShowPlanningModal(false);
      setPlanningFormSubmitted(false);
      setPlanningFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        budget: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-600 py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className={`h-8 w-8 ${scrolled ? 'text-rose-500' : 'text-white'}`} />
              <span className={`text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Elegance Events
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors ${
                    scrolled ? 'text-gray-700 hover:text-rose-500' : 'text-white hover:text-rose-200'
                  }`}
                  onClick={(e) => {
                    if (item === 'Gallery') {
                      e.preventDefault();
                      setShowGalleryModal(true);
                    } else if (item === 'Contact') {
                      e.preventDefault();
                      setShowContactModal(true);
                    }
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={scrolled ? 'text-gray-900' : 'text-white'} />
              ) : (
                <Menu className={scrolled ? 'text-gray-900' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-700 hover:text-rose-500"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item === 'Gallery') {
                      e.preventDefault();
                      setShowGalleryModal(true);
                    } else if (item === 'Contact') {
                      e.preventDefault();
                      setShowContactModal(true);
                    }
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-600">
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
              onClick={() => setShowPlanningModal(true)}
              className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-rose-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Start Planning
              <ChevronRight className="inline ml-2 h-5 w-5" />
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

      {/* Services Section */}
      <section className="py-24 px-4 bg-white">
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
                  <div className="bg-gradient-to-br from-rose-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-white" />
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

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We handle every detail with precision and creativity, ensuring your event is flawlessly executed from start to finish.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-rose-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-400 via-purple-400 to-indigo-400 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"></div>
              <div className="absolute inset-4 rounded-3xl bg-white shadow-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-transparent bg-gradient-to-br from-rose-500 to-purple-500 bg-clip-text mb-4">
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

      {/* Testimonials Section */}
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
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
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

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
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
            <ChevronRight className="inline ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-rose-400" />
                <span className="text-xl font-bold">Elegance Events</span>
              </div>
              <p className="text-gray-400">
                Creating unforgettable moments since 2013
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-rose-400">Weddings</a></li>
                <li><a href="#" className="hover:text-rose-400">Corporate Events</a></li>
                <li><a href="#" className="hover:text-rose-400">Special Occasions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-rose-400">About Us</a></li>
                <li>
                  <button 
                    onClick={() => setShowGalleryModal(true)} 
                    className="hover:text-rose-400"
                  >
                    Gallery
                  </button>
                </li>
                <li><a href="#" className="hover:text-rose-400">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Columbus, OH</span>
                </li>
                <li>info@eleganceevents.com</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Elegance Events. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <Modal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)}
        title="Get In Touch"
      >
        {contactFormSubmitted ? (
          <div className="text-center py-12">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={contactFormData.name}
                    onChange={handleContactInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={contactFormData.email}
                    onChange={handleContactInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={contactFormData.phone}
                  onChange={handleContactInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="message"
                  required
                  value={contactFormData.message}
                  onChange={handleContactInputChange}
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Tell us about your event..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-rose-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        )}
      </Modal>

      {/* Gallery Modal */}
      <Modal 
        isOpen={showGalleryModal} 
        onClose={() => setShowGalleryModal(false)}
        title="Our Work"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-rose-400 via-purple-400 to-indigo-400 h-48 rounded-xl mb-4"></div>
              <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Planning Modal */}
      <Modal 
        isOpen={showPlanningModal} 
        onClose={() => setShowPlanningModal(false)}
        title="Start Planning Your Event"
      >
        {planningFormSubmitted ? (
          <div className="text-center py-12">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
            <p className="text-gray-600">Our team will reach out within 24 hours to discuss your event.</p>
          </div>
        ) : (
          <form onSubmit={handlePlanningSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={planningFormData.name}
                  onChange={handlePlanningInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={planningFormData.email}
                  onChange={handlePlanningInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={planningFormData.phone}
                  onChange={handlePlanningInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  required
                  value={planningFormData.eventType}
                  onChange={handlePlanningInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  required
                  value={planningFormData.eventDate}
                  onChange={handlePlanningInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guest Count *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="guestCount"
                    required
                    value={planningFormData.guestCount}
                    onChange={handlePlanningInputChange}
                    min="1"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  name="budget"
                  required
                  value={planningFormData.budget}
                  onChange={handlePlanningInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000-20000">$10,000 - $20,000</option>
                  <option value="20000-50000">$20,000 - $50,000</option>
                  <option value="50000+">$50,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                name="message"
                value={planningFormData.message}
                onChange={handlePlanningInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Tell us more about your vision for this event..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-rose-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              Submit Planning Request
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}