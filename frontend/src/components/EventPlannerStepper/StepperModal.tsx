import React, { useState, useEffect } from "react";
import {setEvents} from "../../store/eventSlice.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import {createEvent, getEvents} from "../../service/eventService.ts";

type ServiceKey = "WEDDING" | "BUSINESS" | "BIRTHDAY";

const SERVICES: { key: ServiceKey; title: string; desc: string }[] = [
    {
        key: "WEDDING",
        title: "Wedding",
        desc: "Full wedding day planning & coordination — timelines, vendors, and on-site management.",
    },
    {
        key: "BUSINESS",
        title: "Business / Event",
        desc: "Corporate events, product launches, conferences — professional execution and staffing.",
    },
    {
        key: "BIRTHDAY",
        title: "Birthday",
        desc: "Private parties and milestone birthdays — themed planning and entertainment.",
    },
];
export interface EventLocation {
    name?: string;
    description?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
}

export interface EventRequest {
    eventType: ServiceKey;
    contactNumber: string;
    contactName: string;
    eventDate: string;
    time: string;
    expectedGuests: number;
    additionalNotes?: string;
}

const StepperModal: React.FC<{
    onClose: () => void;
    userFirstName?: string;
}> = ({ onClose, userFirstName }) => {
    const [step, setStep] = useState<number>(0);
    const [success, setSuccess] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const [eventLocation, setEventLocation] = useState<EventLocation>({
        name: "",
        description: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        latitude: 0,
        longitude: 0,
    });

    const [eventRequest, setEventRequest] = useState<EventRequest>({
        eventType: "WEDDING",
        contactNumber: "",
        contactName: "",
        eventDate: "",
        time: "",
        expectedGuests: 0,
        additionalNotes: "",
    });

    const reset = () => {
        // setStep(0);
        // setSelectedService(null);
        // setEventDate("");
        // setTime("");
        // setDetails({ eventName: "", contactPhone: "", guests: "", venue: "", notes: "" });
        // setSubmitting(false);
        // setSuccess(null);
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    // const canProceedToDate = selectedService !== null;
    // const canProceedToDetails = eventDate.trim() !== "";

    const handleSubmit = async () => {
        // Basic client-side validation
        // if (!selectedService || !eventDate) return;
        // setSubmitting(true);

        try {
            console.log("Event request payload:", {...eventRequest, location: eventLocation, eventDateTime: `${eventRequest.eventDate}T${eventRequest.time}:00`});
            const token = localStorage.getItem("jwt") || "";
            // Replace this fetch with your real API endpoint
            // For demo we just wait and mark success
            // await fetch("/api/event/create", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${token}`
            //     },
            //     body: JSON.stringify({...eventRequest, location: eventLocation, eventDateTime: `${eventRequest.eventDate}T${eventRequest.time}:00`}),
            // });

            await createEvent(token, {...eventRequest, location: eventLocation, eventDateTime: `${eventRequest.eventDate}T${eventRequest.time}:00`});

            const events = await getEvents(token);
            dispatch(setEvents(events)); // Trigger refresh of events in the store
            setSuccess("Request submitted — our team will contact you shortly.");
            // setSubmitting(false);
            setStep(3); // final success step
        } catch (err) {
            console.error(err);
            // setSubmitting(false);
            setSuccess("Failed to submit. Try again later.");
        }
    };

    return (
        <div className={`pt-6`}>
            <div className="w-full rounded-xl bg-white">
                {/*<div className="flex items-center justify-between border-b px-6 py-4">*/}
                {/*    <div>*/}
                {/*        <h3 className="text-lg font-semibold">Schedule an Event</h3>*/}
                {/*        <p className="text-sm text-gray-500">A quick 3-step request form</p>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* Stepper indicator */}
                <div className="flex items-center gap-4 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 flex items-center justify-center rounded-full ${step === 0 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}>1</div>
                        <div className="text-sm">Service</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 flex items-center justify-center rounded-full ${step === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}>2</div>
                        <div className="text-sm">Date</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 flex items-center justify-center rounded-full ${step === 2 || step === 3 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}>3</div>
                        <div className="text-sm">Details</div>
                    </div>
                </div>

                <div className="px-6 py-6">
                    {/* Step 0: Choose service */}
                    {step === 0 && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {SERVICES.map((s) => (
                                <button
                                    key={s.key}
                                    onClick={() => {
                                        setEventRequest((prev) => ({ ...prev, eventType: s.key }));
                                        setStep(1);
                                    }}
                                    className="group rounded-lg border p-4 text-left hover:shadow-md bg-indigo-600"
                                >
                                    <h4 className="mb-2 text-lg text-white font-medium">{s.title}</h4>
                                    <p className="text-sm text-white">{s.desc}</p>
                                    <div className="mt-3 text-sm text-white group-hover:underline">Select</div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 1: Date selection */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-medium">{eventRequest.eventType} — Pick a date</h4>
                                <p className="text-sm text-gray-500">Choose a preferred date for your event.</p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="date"
                                    value={eventRequest.eventDate}
                                    onChange={(e) => {
                                        setEventRequest((prev) => ({ ...prev, eventDate: e.target.value }))
                                    }}
                                    className="rounded-md border px-3 py-2"
                                />
                                <input
                                    type="time"
                                    value={eventRequest.time}
                                    onChange={(e) => setEventRequest((prev) => ({ ...prev, time: e.target.value }))}
                                    className="rounded-md border px-3 py-2"
                                />
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    onClick={() => setStep(0)}
                                    className="rounded-md border px-4 py-2 text-sm"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setStep(2)}
                                    // disabled={!canProceedToDate}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Details and submit */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Tell us about the event</h4>

                            <div className="grid gap-3 md:grid-cols-2">
                                <input
                                    placeholder="Contact name"
                                    className="rounded-md border px-3 py-2"
                                    value={eventRequest.contactName}
                                    onChange={(e) => setEventRequest((prev) => ({
                                        ...prev,
                                        contactName: e.target.value
                                    }))}
                                />

                                <input
                                    placeholder="Contact phone"
                                    className="rounded-md border px-3 py-2"
                                    value={eventRequest.contactNumber.toString()}
                                    onChange={(e) => setEventRequest((prev) => ({
                                        ...prev,
                                        contactNumber: e.target.value
                                    }))}
                                />

                                <input
                                    placeholder="Estimated number of guests"
                                    className="rounded-md border px-3 py-2"
                                    type={"number"}
                                    value={eventRequest.expectedGuests}
                                    onChange={(e) => setEventRequest((prev) => ({
                                        ...prev,
                                        expectedGuests: parseInt(e.target.value)
                                    }))}
                                />

                                <input
                                    placeholder="Street Address"
                                    className="rounded-md border px-3 py-2"
                                    value={eventLocation.addressLine1}
                                    onChange={(e) => setEventLocation({...eventLocation, addressLine1: e.target.value})}
                                />

                                <input
                                    placeholder="City"
                                    className="rounded-md border px-3 py-2"
                                    value={eventLocation.city}
                                    onChange={(e) => setEventLocation({...eventLocation, city: e.target.value})}
                                />

                                <input
                                    placeholder="State"
                                    className="rounded-md border px-3 py-2"
                                    value={eventLocation.state}
                                    onChange={(e) => setEventLocation({...eventLocation, state: e.target.value})}
                                />

                                <input
                                    placeholder="Postal Code"
                                    className="rounded-md border px-3 py-2"
                                    value={eventLocation.postalCode}
                                    onChange={(e) => setEventLocation({...eventLocation, postalCode: e.target.value})}
                                />

                                <input
                                    placeholder="Country"
                                    className="rounded-md border px-3 py-2"
                                    value={eventLocation.country}
                                    onChange={(e) => setEventLocation({...eventLocation, country: e.target.value})}
                                />
                            </div>

                            <textarea
                                placeholder="Additional notes (vendors, preferred setup, special requests)"
                                className="w-full rounded-md border px-3 py-2"
                                rows={4}
                                value={eventRequest.additionalNotes}
                                onChange={(e) => setEventRequest((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                            />

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="rounded-md border px-4 py-2 text-sm"
                                >
                                    Back
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    // disabled={submitting}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                                >
                                    {/*{submitting ? "Submitting..." : "Submit Request"}*/}
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Success view */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Thank you!</h4>
                            <p className="text-sm text-gray-600">{success}</p>

                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={handleClose}
                                    className="rounded-md border px-4 py-2 text-sm"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        reset();
                                    }}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
                                >
                                    Schedule another
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default StepperModal;
