import React, { useState } from "react";

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

const StepperModal: React.FC<{
    onClose: () => void;
    userFirstName?: string;
}> = ({ onClose, userFirstName }) => {
    const [step, setStep] = useState<number>(0);
    const [selectedService, setSelectedService] = useState<ServiceKey | null>(null);
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [details, setDetails] = useState({
        eventName: "",
        contactPhone: "",
        guests: "",
        venue: "",
        notes: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const reset = () => {
        setStep(0);
        setSelectedService(null);
        setDate("");
        setTime("");
        setDetails({ eventName: "", contactPhone: "", guests: "", venue: "", notes: "" });
        setSubmitting(false);
        setSuccess(null);
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const canProceedToDate = selectedService !== null;
    const canProceedToDetails = date.trim() !== "";

    const handleSubmit = async () => {
        // Basic client-side validation
        if (!selectedService || !date) return;
        setSubmitting(true);
        const payload = {
            service: selectedService,
            date,
            time,
            details,
            requestedBy: userFirstName || "",
            createdAt: new Date().toISOString(),
        };

        try {
            // Replace this fetch with your real API endpoint
            // For demo we just wait and mark success
            await new Promise((res) => setTimeout(res, 900));
            console.log("Event request payload:", payload);
            setSuccess("Request submitted — our team will contact you shortly.");
            setSubmitting(false);
            setStep(3); // final success step
        } catch (err) {
            console.error(err);
            setSubmitting(false);
            setSuccess("Failed to submit. Try again later.");
        }
    };

    return (
        <div style={{ border: '1px solid red', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="w-full max-w-3xl rounded-xl bg-white shadow-lg ring-1 ring-black/5" style={{ border: '1px solid blue', width: '100%' }}>
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h3 className="text-lg font-semibold">Schedule an Event</h3>
                        <p className="text-sm text-gray-500">A quick 3-step request form</p>
                    </div>
                    <div>
                        <button
                            onClick={handleClose}
                            className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                        >
                            Close
                        </button>
                    </div>
                </div>

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
                                        setSelectedService(s.key);
                                        setStep(1);
                                    }}
                                    className="group rounded-lg border p-4 text-left hover:shadow-md"
                                >
                                    <h4 className="mb-2 text-lg font-medium">{s.title}</h4>
                                    <p className="text-sm text-gray-500">{s.desc}</p>
                                    <div className="mt-3 text-sm text-indigo-600 group-hover:underline">Select</div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 1: Date selection */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-medium">{selectedService} — Pick a date</h4>
                                <p className="text-sm text-gray-500">Choose a preferred date for your event.</p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="rounded-md border px-3 py-2"
                                />
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
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
                                    onClick={() => canProceedToDate && setStep(2)}
                                    disabled={!canProceedToDate}
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
                                    placeholder="Event name"
                                    className="rounded-md border px-3 py-2"
                                    value={details.eventName}
                                    onChange={(e) => setDetails({ ...details, eventName: e.target.value })}
                                />

                                <input
                                    placeholder="Contact phone"
                                    className="rounded-md border px-3 py-2"
                                    value={details.contactPhone}
                                    onChange={(e) => setDetails({ ...details, contactPhone: e.target.value })}
                                />

                                <input
                                    placeholder="Estimated number of guests"
                                    className="rounded-md border px-3 py-2"
                                    value={details.guests}
                                    onChange={(e) => setDetails({ ...details, guests: e.target.value })}
                                />

                                <input
                                    placeholder="Venue / Location"
                                    className="rounded-md border px-3 py-2"
                                    value={details.venue}
                                    onChange={(e) => setDetails({ ...details, venue: e.target.value })}
                                />
                            </div>

                            <textarea
                                placeholder="Additional notes (vendors, preferred setup, special requests)"
                                className="w-full rounded-md border px-3 py-2"
                                rows={4}
                                value={details.notes}
                                onChange={(e) => setDetails({ ...details, notes: e.target.value })}
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
                                    disabled={submitting}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                                >
                                    {submitting ? "Submitting..." : "Submit Request"}
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
