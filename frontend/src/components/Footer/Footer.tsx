import React from 'react';
import {MapPin, Sparkles} from "lucide-react";
interface FooterProps {
    setShowGalleryModal: (value: boolean) => void;
}
const Footer: React.FC<FooterProps> = ({ setShowGalleryModal }: FooterProps) => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Sparkles className="h-6 w-6 text-rose-400"/>
                            <span className="text-xl font-bold">GG Decor</span>
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
                                <MapPin className="h-4 w-4"/>
                                <span>Columbus, OH</span>
                            </li>
                            <li>info@eleganceevents.com</li>
                            <li>(555) 123-4567</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 GG Decor. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
