import { useState } from "react";
import { Star } from "lucide-react";
import Modal from "../shared/Modal.tsx";

export default function RatingModal({ event, isOpen, onClose, onSubmit }) {
    const [rating, setRating] = useState(event?.rating?.score || 0); // selected rating
    const [hover, setHover] = useState(event?.rating?.score || 0); // hovered rating
    const [comment, setComment] = useState(event?.rating?.comment || ""); // comment text

    const handleSubmit = () => {
        onSubmit({ eventId: event.id, rating, comment });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Rate Your Event">
            <div className="p-4">

                {/* Rating stars */}
                <div className="flex gap-2 justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((value) => {
                        const isFilled = value <= (hover || rating);

                        return (
                            <Star
                                key={value}
                                onMouseEnter={() => setHover(value)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setRating(value)}
                                className={`
                  h-8 w-8 cursor-pointer transition
                  stroke-yellow-400
                  ${isFilled ? "fill-yellow-400" : "fill-transparent"}
                `}
                            />
                        );
                    })}
                </div>

                {/* Comment input */}
                <textarea
                    className="w-full p-2 border rounded-lg outline-none focus:ring focus:ring-yellow-300"
                    placeholder="Write a comment (optional)"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                {/* Buttons */}
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={rating === 0}
                    >
                        Submit Rating
                    </button>
                </div>

            </div>
        </Modal>
    );
}
