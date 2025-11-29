import React from "react";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    FileText,
    ArrowLeft,
    Tag,
    Info
} from "lucide-react";

interface PastEventDetailsProps {
    event?: {
        id: number;
        eventType: string;
        eventDate: string;
        venueAddress: string;
        expectedGuests: number;
        status: string;
        additionalNotes?: string;
        location: {
            city: string;
            country: string;
            postalCode: string;
        };
    };
    onBack?: () => void;
}

const PastEventDetails: React.FC<PastEventDetailsProps> = ({
                                                               event,
                                                               onBack
                                                           }) => {
    // If no event is provided, show a placeholder or error state
    if (!event) {
        return (
            <div className="w-full p-6 text-center">
                <Info className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">No event details available</p>
            </div>
        );
    }

    // Status color mapping
    const getStatusColor = (status: string) => {
        switch(status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'upcoming':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="w-full rounded-xl bg-white">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center space-x-4">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="bg-indigo-600 text-white"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>
                    )}
                    <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
                </div>
                <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}
                >
                    {event.status}
                </div>
            </div>

            {/* Event Details Grid */}
            <div className="p-6 space-y-6">
                {/* Event Type and Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <Tag className="h-5 w-5 text-gray-500" />
                            <h3 className="text-lg font-semibold text-gray-800">
                                {event.eventType}
                            </h3>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Calendar className="h-5 w-5 text-gray-500" />
                            <span>{event.eventDate}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-gray-500" />
                            <span className="text-gray-700">
                                {event.expectedGuests} Expected Guests
                            </span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <MapPin className="h-5 w-5 text-gray-500" />
                            <span>
                                {event.location.city}, {event.location.country}
                                {' '} {event.location.postalCode}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Venue Address */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <h4 className="font-semibold text-gray-700">Venue Address</h4>
                    </div>
                    <p className="text-gray-600">{event.venueAddress}</p>
                </div>

                {/* Additional Notes */}
                {event.additionalNotes && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3 mb-2">
                            <FileText className="h-5 w-5 text-gray-500" />
                            <h4 className="font-semibold text-gray-700">Additional Notes</h4>
                        </div>
                        <p className="text-gray-600">{event.additionalNotes}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PastEventDetails;
