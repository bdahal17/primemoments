import React, {useState} from 'react';
import {CheckCircle, Mail, MessageSquare, Phone, User} from "lucide-react";
import Modal from "../shared/Modal.tsx";
interface ContactProps {
    showContactModal: boolean;
    setShowContactModal: (value: boolean) => void;
};

const Contact: React.FC<ContactProps> = ({
    showContactModal,
    setShowContactModal}: ContactProps) => {

    const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

    const [contactFormData, setContactFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });


    const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
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
    );
}
export default Contact;
