import React, {useEffect} from "react";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    FileText,
    ArrowLeft,
    Tag,
    Info, Phone, User
} from "lucide-react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {addNotes, approveEvent, getEvents} from "../../service/eventService.ts";
import {setEvents} from "../../store/eventSlice.ts";

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

const EventDetails: React.FC<PastEventDetailsProps> = ({
                                                               event,
                                                               onBack
                                                           }) => {

    const user = useAppSelector((state) => state.user.userInfo);
    const dispatch = useAppDispatch();
    const events = useAppSelector((state) => state.events.events);
    const [notes, setNotes] = React.useState("");

    const latestEvent = events.find(e => e.id === event?.id) || event;

    useEffect(() => {
        console.log("Event details component mounted.");
        console.log("Event data:", event);

    }, []);

    // If no event is provided, show a placeholder or error state
    if (!latestEvent) {
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

    const handleApprove = async () => {
        try {
            const token = localStorage.getItem("jwt");
            await approveEvent(token, latestEvent?.id);
            const allEvents = await getEvents(token);
            dispatch(setEvents(allEvents));
        } catch (error) {
            console.error("Error approving event:", error);
        }
    }
    const disableApprove = latestEvent?.status.toLowerCase() === 'pending';

    const handleAdditonalNotes = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwt");
            await addNotes(token, latestEvent?.id, notes);
            const allEvents = await getEvents(token);
            dispatch(setEvents(allEvents));
            setNotes("")
        } catch (error) {
            console.error("Error approving event:", error);
        }
    };

    const parseJson = (text: string) => {
        try {
            return JSON.parse(text);
        } catch (e) {
            return null;
        }
    }

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
                    {user.role === 'ADMIN' && (
                        <button
                            className={`${disableApprove ? "bg-green-600" : "bg-gray-400"} text-white ml-4`}
                            onClick={handleApprove}
                            disabled={!disableApprove}
                        >
                            Approve
                        </button>
                    )}
                    <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
                </div>
                <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(latestEvent?.status)}`}
                >
                    {latestEvent?.status}
                </div>
            </div>

            {/* Event Details Grid */}
            <div className="p-6 space-y-6">
                {/* Event Type and Basic Info */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <Tag className="h-5 w-5 text-gray-500"/>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {latestEvent?.eventType}
                            </h3>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Calendar className="h-5 w-5 text-gray-500"/>
                            <span>{latestEvent?.eventDate}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-gray-500"/>
                            <span className="text-gray-700">
                                {latestEvent?.contactName}
                            </span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Phone className="h-5 w-5 text-gray-500"/>
                            <span>
                                {latestEvent?.contactPhone}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-gray-500"/>
                            <span className="text-gray-700">
                                {latestEvent?.expectedGuests} Expected Guests
                            </span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <MapPin className="h-5 w-5 text-gray-500"/>
                            <span>
                                {latestEvent?.location.city}, {latestEvent?.location.country}
                                {' '} {latestEvent?.location.postalCode}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Venue Address */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="h-5 w-5 text-gray-500"/>
                        <h4 className="font-semibold text-gray-700">Venue Address</h4>
                    </div>
                    <p className="text-gray-600">{latestEvent?.venueAddress}</p>
                </div>

                {/* Additional Notes */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                        <FileText className="h-5 w-5 text-gray-500"/>
                        <h4 className="font-semibold text-gray-700">Additional Notes</h4>
                        </div>
                        <p className="text-gray-600">{latestEvent?.additionalNotes}</p>
                        {latestEvent?.noteDto.filter(note => note.content?.trim() !== "").map((note, index) => {
                            return (<div key={index} className="mt-2 p-2 bg-white border border-gray-200 rounded">
                                <p className="text-sm text-gray-500">{note.user}</p>
                                <p className="text-sm text-gray-500">{note.createdAt}</p>
                                <p className="text-gray-700">{note.content}</p>
                            </div>);
                        })}
                        <form
                            onSubmit={handleAdditonalNotes}
                            className="mt-4 flex space-x-2"
                        >
                            <textarea
                                value={notes}
                            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setNotes(e.target.value)}
                            />
                            <button
                                type="submit"
                            >
                                Send
                            </button>
                        </form>
                    </div>
            </div>
        </div>
    );
};

export default EventDetails;
