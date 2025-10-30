import React from 'react';
import Modal from "../shared/Modal.tsx";

interface GalleryProps {
    showGalleryModal: boolean;
    setShowGalleryModal: (value: boolean) => void;
}
const Gallery: React.FC<GalleryProps> = ({ showGalleryModal, setShowGalleryModal }: GalleryProps) => {

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

    return (
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
    );
};

export default Gallery;
