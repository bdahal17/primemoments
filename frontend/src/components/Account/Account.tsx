import React, {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import StepperModal from "../EventPlannerStepper/StepperModal.tsx";
import {getEvents} from "../../service/eventService.ts";
import {setEvents} from "../../store/eventSlice.ts";
import {
    Calendar,
    MapPin,
    Users,
    CheckCircle,
    Clock,
    Info, User, Mail, Phone, MessageSquare
} from 'lucide-react';
import Contact from "../Contact/Contact.tsx";
import Modal from "../shared/Modal.tsx";
import {sendEmail} from "../../service/emailService.ts";
import Breadcrumb from "../Breadcrumb/Breadcrumb.tsx";
import PastEvent from "../PastEvent/PastEvent.tsx";

// Define an enum for dashboard tabs
enum DashboardTab {
    ScheduleEvent = "Schedule Event",
    PastEvents = "Past Events",
    AccountSettings = "Account Settings",
    Contact = "Contact Form"
}

const Account: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.ScheduleEvent);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const events = useAppSelector((state) => state.events.events);
    const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
    const [viewDetails, setViewDetails] = useState(false);

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

    const renderEventStatusBadge = (status: string) => {
        const statusColors = {
            'COMPLETED': 'bg-green-100 text-green-800',
            'PENDING': 'bg-yellow-100 text-yellow-800',
            'CANCELLED': 'bg-red-100 text-red-800',
            'DRAFT': 'bg-gray-100 text-gray-800'
        };

        const color = statusColors[status.toUpperCase()] || statusColors['DRAFT'];

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                <CheckCircle className="mr-1.5 h-3 w-3" />
                {status}
            </span>
        );
    };

    const handleEmailSubmit = async () => {
        try {
            await sendEmail(localStorage.getItem("jwt"), contactFormData);
            console.log("email sent:", contactFormData);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }

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
                return <PastEvent
                    events={events}
                    renderEventStatusBadge={renderEventStatusBadge}
                    setViewDetails={setViewDetails}
                    viewDetails={viewDetails}
                />;
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
            case DashboardTab.Contact:
                return (
                    <div className="w-full rounded-xl bg-white">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div>
                                <h3 className="text-lg font-semibold">Contact Form</h3>
                                <p className="text-sm text-gray-500">Email us your questions!</p>
                            </div>
                        </div>
                        <div className="admin-content mt-6">
                            {/*<h2 className="mb-4 text-xl font-medium">Account Settings</h2>*/}
                            {/*<Modal*/}
                            {/*    isOpen={true}*/}
                            {/*    onClose={() => {}}*/}
                            {/*    title="Get In Touch"*/}
                            {/*>*/}
                                {contactFormSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="h-10 w-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                        <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={() => {
                                        setContactFormSubmitted(true);
                                        handleEmailSubmit();
                                    }} className="space-y-4">
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
                                            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-rose-600 hover:to-purple-600 transition-all transform hover:scale-105"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                )}
                            {/*</Modal>*/}
                        </div>
                    </div>
                )
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
                                setViewDetails(false);
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
    );
};

export default Account;
