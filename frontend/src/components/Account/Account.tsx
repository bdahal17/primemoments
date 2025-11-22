import React, {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import StepperModal from "../EventPlannerStepper/StepperModal.tsx";
import {getEvents} from "../../service/eventService.ts";
import {setEvents} from "../../store/eventSlice.ts";

// Define an enum for dashboard tabs
enum DashboardTab {
    ScheduleEvent = "Schedule Event",
    PastEvents = "Past Events",
    AccountSettings = "Account Settings"
}

const Account: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.ScheduleEvent);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const events = useAppSelector((state) => state.events.events);

    const bookedEvents = [
        { id: 1, name: "Event 1", date: "2024-07-15" },
        { id: 2, name: "Event 2", date: "2024-08-20" },
    ]; // Placeholder for booked events data

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

    const renderTabContent = () => {
        switch(activeTab) {
            case DashboardTab.ScheduleEvent:
                return (

                    <div className="w-full rounded-xl bg-white">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div>
                                <h3 className="text-lg font-semibold">Schedule an Event</h3>
                                <p className="text-sm text-gray-500">A quick 3-step request form</p>
                            </div>
                        </div>
                        <StepperModal
                            onClose={() => setIsEventModalOpen(false)}
                            userFirstName={userInfo?.firstName}
                        />
                    </div>
            )
                ;
            case DashboardTab.PastEvents:
                return events.length === 0 ? (
                        <div className="w-full rounded-xl bg-white">
                            <div className="flex items-center justify-between border-b px-6 py-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Your Past Events</h3>
                                    <p className="text-sm text-gray-500">A quick 3-step request form</p>
                                </div>
                            </div>
                            <div className="admin-content mt-6">
                                <h2 className="mb-4 text-xl font-medium">Your Booked Events</h2>
                                <p className="text-sm text-gray-500">You have no booked events at the moment.</p>
                            </div>
                        </div>
            ) :
                (
                        <div className="w-full rounded-xl bg-white">
                            <div className="flex items-center justify-between border-b px-6 py-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Your Past Events</h3>
                                    <p className="text-sm text-gray-500">List of all of your events!</p>
                                </div>
                            </div>
                            <div className="admin-content mt-6">
                                {/*<h2 className="mb-4 text-xl font-medium">Your Booked Events</h2>*/}
                                <ul className="space-y-4">
                                    {events.map((event) => (
                                        <li key={event.id} className="rounded-lg border p-4">
                                            <h3 className="text-lg font-semibold">{event.eventType}</h3>
                                            <p className="text-sm text-gray-600">Date: {event.eventDate}</p>
                                            <p className="text-sm text-gray-600">Status: {event.status}</p>
                                            <p className="text-sm text-gray-600">Expected Guests: {event.expectedGuests}</p>
                                            <p className="text-sm text-gray-600">Street Address: {event.location?.addressLine1}</p>
                                            <p className="text-sm text-gray-600">City: {event.location?.city}</p>
                                            <p className="text-sm text-gray-600">Postal Code: {event.location?.postalCode}</p>
                                            <p className="text-sm text-gray-600">Country: {event.location?.country}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                    ;
            case DashboardTab.AccountSettings:
                return (

                    <div className="w-full rounded-xl bg-white">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div>
                                <h3 className="text-lg font-semibold">You Account Settings</h3>
                                <p className="text-sm text-gray-500">View your account settings!</p>
                            </div>
                        </div>
                        <div className="admin-content mt-6">
                            {/*<h2 className="mb-4 text-xl font-medium">Account Settings</h2>*/}
                            <div className="space-y-4">
                                <div className="bg-white shadow rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                                    <p>Name: {userInfo?.firstName} {userInfo?.lastName}</p>
                                    <p>Email: {userInfo?.email}</p>
                                </div>
                                {/* Add more settings sections as needed */}
                                <div className="bg-white shadow rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                                    {/* Add user preferences, notification settings, etc. */}
                                    <p>Notification preferences, theme settings, etc.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="admin-dashboard p-6">
            <div className="admin-header mb-6 pt-20">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {userInfo?.firstName || "User"}!</p>
            </div>

            {/* Subnav Bar */}
            <div className="subnav-container mb-6">
                <nav className="flex space-x-4 border-b pb-2">
                    {Object.values(DashboardTab).map((tab) => (
                        <button
                            key={tab}
                            className={`
                                px-4 py-2 text-sm font-medium transition duration-300 bg-transparent
                                ${activeTab === tab
                                ? 'text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'}
                            `}
                            onClick={() => {
                                setActiveTab(tab);
                                setIsEventModalOpen(tab === DashboardTab.ScheduleEvent);
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            <div className={`pt-6`}>
                {renderTabContent()}
            </div>
        </div>
    )
        ;
};

export default Account;
