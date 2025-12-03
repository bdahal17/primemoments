import React, {useEffect, useState} from 'react';
import {Calendar, Clock, Info, MapPin, Users} from "lucide-react";
import EventDetails from "../../PastEvent/EventDetails.tsx";
import {getEvents} from "../../../service/eventService.ts";
import {setEvents} from "../../../store/eventSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";

interface PastEventProps {
    // Define any props if needed in the future
    viewDetails?: boolean;
    setViewDetails?: (value: boolean) => void;
    renderEventStatusBadge?: (status: string) => React.JSX.Element;
}

const AdminEvents: React.FC<PastEventProps> = ({
                                                   viewDetails,
                                                   setViewDetails,
                                                   renderEventStatusBadge,
                                               }) => {
    const [selectedEvent, setSelectedEvent] = useState();
    const dispatch = useAppDispatch();

    const events = useAppSelector((state) => state.events.events);




    useEffect( () => {
        console.log("Fetching events for user...");
        (async () => {
            try {
                const token = localStorage.getItem("jwt");
                const allEvents = await getEvents(token);
                dispatch(setEvents(allEvents));
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        })();
    }, []);

    return (
        <div className="w-full rounded-xl bg-white">
            {!viewDetails && events.map((event) => (
                <div
                    key={event?.id}
                    className="px-6 py-4 hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <MapPin className="h-6 w-6 text-blue-600"/>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {event?.eventType}
                                </h3>
                                {renderEventStatusBadge(event?.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-gray-400"/>
                                    <span>{event?.eventDate}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="mr-2 h-4 w-4 text-gray-400"/>
                                    <span>{event?.expectedGuests} Guests</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-2 h-4 w-4 text-gray-400"/>
                                    <span>{event?.location?.city}, {event?.location?.country}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-gray-400"/>
                                    <span>{event?.location?.postalCode}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Optional: View Details Button */}
                    <div className="mt-4 flex justify-end">
                        <button
                            className="text-sm text-white hover:text-gray-200 flex items-center bg-indigo-600"
                            onClick={() => {
                                setSelectedEvent(event);
                                setViewDetails(true)
                            }}
                        >
                            <Info className="mr-1.5 h-4 w-4"/>
                            View Details
                        </button>
                    </div>
                </div>
            ))}
            {viewDetails && (
                <EventDetails event={selectedEvent} onBack={() => setViewDetails(false)}/>
            )}
        </div>
    );
}

export default AdminEvents;
