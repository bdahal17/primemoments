import React, {useEffect, useState} from "react";
import type JSX from "react";
import {Calendar, Clock, Info, MapPin, MessageSquareText, Star, Users, UserStar} from "lucide-react";
import EventDetails from "./EventDetails.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {addRating, approveEvent, getEvents} from "../../service/eventService.ts";
import {setEvents} from "../../store/eventSlice.ts";
import Modal from "../shared/Modal.tsx";
import RatingModal from "../Rating/RatingModal.tsx";

interface PastEventProps {
    // Define any props if needed in the future
    viewDetails?: boolean;
    setViewDetails?: (value: boolean) => void;
    renderEventStatusBadge?: (status: string) => React.JSX.Element;
}

const PastEvent: React.FC<PastEventProps> = ({
                                                 viewDetails,
                                                 setViewDetails,
                                                 renderEventStatusBadge,
}) => {

    const [selectedEvent, setSelectedEvent] = useState();
    const [seeMore, setSeeMore] = useState(false);
    const user = useAppSelector((state) => state.user.userInfo);

    const events = useAppSelector((state) => state.events.events);
    const { userInfo } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [addReview, setAddReview] = useState(false);




    useEffect( () => {
        console.log("Fetching events for user:", userInfo);
        (async () => {
            try {
                const token = localStorage.getItem("jwt");
                const events = await getEvents(token);
                dispatch(setEvents(events));
                console.log("Fetched events:", events);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        })();
    }, []);

    const handleRating = async (ratingData: { eventId: number, rating: number; comment: string }) => {
        setSeeMore(false);
        setAddReview(false);
        try {
            const token = localStorage.getItem("jwt");
            await addRating(token, ratingData);
            const allEvents = await getEvents(token);
            dispatch(setEvents(allEvents));
        } catch (error) {
            console.error("Error approving event:", error);
        }
    }

    return events.length === 0 ? (
        <div className="w-full rounded-xl bg-white">
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                    <h3 className="text-lg font-semibold">Your Past Events</h3>
                    <p className="text-sm text-gray-500">Looks like you haven't hosted any events yet!</p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-12 text-center">
                <Calendar className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">No events scheduled yet. Ready to plan your first event?</p>
            </div>
        </div>
        ) : (
        <div className="w-full rounded-xl bg-white">
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                    <h3 className="text-lg font-semibold">Your Past Events</h3>
                    <p className="text-sm text-gray-500">List of all of your events!</p>
                </div>
            </div>
            <div className="divide-y divide-gray-200">
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
                        <div className="mt-4 flex flex-wrap justify-between mt-8">
                            <div className={"flex flex-col items-start col-span-2 mb-5"}>
                                <div className={"flex items-center mr-4"}>
                                    <UserStar className="mr-2 h-5 w-5 text-gray-400"/>
                                    {[1, 2, 3, 4, 5].map(item => {
                                        return (
                                            <Star
                                                key={item}
                                                className={`
                                                        h-4 w-4
                                                        ${event?.rating && item <= event?.rating?.score
                                                    ? "fill-yellow-400 stroke-yellow-400"
                                                    : "fill-transparent stroke-yellow-400"}
                                                    `}
                                            />
                                        )
                                    })}
                                </div>
                                <div className={"flex items-center"}>
                                    <span>
                                        {!seeMore && event?.rating?.comment.length > 50 ?
                                        <span>{event?.rating?.comment?.substring(0, 50)}
                                            <span onClick={
                                                () => {
                                                    setSeeMore(true)
                                                }}
                                                  className={"text-indigo-600 cursor-pointer ml-1"}
                                            >
                                                    see more...
                                            </span>
                                        </span>
                                        :
                                        <span>{event?.rating?.comment.length < 50 ? <span>{event?.rating?.comment}</span> :
                                            <span>
                                                {event?.rating?.comment ? <span>{event?.rating?.comment}
                                                        <span onClick={
                                                            () => {
                                                                setSeeMore(false)
                                                            }}
                                                              className={"text-indigo-600 cursor-pointer ml-1"}
                                                        >
                                                        see less...
                                                        </span>
                                                    </span>: ""}
                                            </span>}
                                        </span>
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className={"flex"}>

                                    <button
                                        className={`text-sm text-white flex items-center ${event?.rating ? 'bg-indigo-600 hover:text-gray-200' : 'bg-gray-400'} mr-4 h-10 w-38`}
                                        onClick={() => {
                                            setSelectedEvent(event)
                                            setAddReview(true)
                                        }}
                                        disabled={event?.status !== 'CONFIRMED'}
                                    >
                                        <Star className="mr-1.5 h-4 w-4"/>
                                        {event?.rating ? 'Edit Review' : 'Add Review'}
                                    </button>

                                <button
                                    className="text-sm text-white hover:text-gray-200 flex items-center bg-indigo-600 h-10 w-38"
                                    onClick={() => {
                                        setSelectedEvent(event)
                                        setViewDetails(true)
                                    }}
                                >
                                    <Info className="mr-1.5 h-4 w-4"/>
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {viewDetails && (
                    <EventDetails
                        event={selectedEvent}
                        onBack={() => setViewDetails(false)}
                    />
                )}
                {addReview && (
                    <RatingModal event={selectedEvent} isOpen={addReview} onClose={() => setAddReview(false)}
                                 onSubmit={handleRating}/>
                )}
            </div>
        </div>
    );
};
export default PastEvent;
