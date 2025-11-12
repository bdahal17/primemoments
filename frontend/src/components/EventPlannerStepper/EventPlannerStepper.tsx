import React, { useState } from "react";

const EventPlannerStepper: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [eventDetails, setEventDetails] = useState({
        name: "",
        guests: 0,
        location: "",
        additionalNotes: ""
    });

    const services = [
        {
            id: "wedding",
            title: "Wedding Planning",
            description: "Comprehensive wedding event planning service tailored to your special day."
        },
        {
            id: "business",
            title: "Business/Corporate Event",
            description: "Professional event management for conferences, seminars, and corporate gatherings."
        },
        {
            id: "birthday",
            title: "Birthday Celebration",
            description: "Personalized birthday party planning for memorable celebrations."
        }
    ];

    const handleServiceSelect = (service: string) => {
        setSelectedService(service);
        setCurrentStep(2);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setCurrentStep(3);
    };

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventDetails(prev => ({
            ...prev,
            [name]: name === "guests" ? Number(value) : value
        }));
    };

    const handleSubmit = () => {
        // TODO: Implement actual submission logic
        console.log("Event Submission", {
            service: selectedService,
            date: selectedDate,
            details: eventDetails
        });
        alert("Event request submitted successfully!");
    };

    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <div className="service-selection">
                        <h2>Select Event Type</h2>
                        <div className="service-cards">
                            {services.map(service => (
                                <div
                                    key={service.id}
                                    className="service-card"
                                    onClick={() => handleServiceSelect(service.id)}
                                >
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="date-selection">
                        <h2>Select Event Date</h2>
                        <input
                            type="date"
                            onChange={(e) => handleDateSelect(new Date(e.target.value))}
                        />
                        <div className="stepper-actions">
                            <button onClick={() => setCurrentStep(1)}>Back</button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="event-details">
                        <h2>Event Details</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Event Name"
                            value={eventDetails.name}
                            onChange={handleDetailsChange}
                        />
                        <input
                            type="number"
                            name="guests"
                            placeholder="Number of Guests"
                            value={eventDetails.guests}
                            onChange={handleDetailsChange}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Event Location"
                            value={eventDetails.location}
                            onChange={handleDetailsChange}
                        />
                        <textarea
                            name="additionalNotes"
                            placeholder="Additional Notes"
                            value={eventDetails.additionalNotes}
                            onChange={handleDetailsChange}
                        />
                        <div className="stepper-actions">
                            <button onClick={() => setCurrentStep(2)}>Back</button>
                            <button onClick={handleSubmit}>Submit Request</button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="event-planner-stepper">
            <div className="stepper-progress">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>Service Selection</div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>Date Selection</div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>Event Details</div>
            </div>
            {renderStep()}
        </div>
    );
};

export default EventPlannerStepper;
