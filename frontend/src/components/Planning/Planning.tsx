import React, {useState} from 'react';
import {CheckCircle, DollarSign, Users} from "lucide-react";
import emailjs from "@emailjs/browser";
import Modal from "../shared/Modal.tsx";

interface PlanningProps {
    showPlanningModal: boolean;
    setShowPlanningModal: (show: boolean) => void;

}
const Planning: React.FC<PlanningProps> = (
    {
        showPlanningModal,
        setShowPlanningModal,
    }: PlanningProps
) => {

    const [planningFormSubmitted, setPlanningFormSubmitted] = useState(false);
    const [planningFormData, setPlanningFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        budget: '',
        message: ''
    });


    const handlePlanningSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    const handlePlanningInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPlanningFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

  return (
      <Modal
          isOpen={showPlanningModal}
          onClose={() => setShowPlanningModal(false)}
          title="Start Planning Your Event"
      >
          {planningFormSubmitted ? (
              <div className="text-center py-12">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
                  <p className="text-gray-600">Our team will reach out within 24 hours to discuss your event.</p>
              </div>
          ) : (
              <form onSubmit={handlePlanningSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                          </label>
                          <input
                              type="text"
                              name="name"
                              required
                              value={planningFormData.name}
                              onChange={handlePlanningInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                              placeholder="John Doe"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                          </label>
                          <input
                              type="email"
                              name="email"
                              required
                              value={planningFormData.email}
                              onChange={handlePlanningInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                              placeholder="john@example.com"
                          />
                      </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone *
                          </label>
                          <input
                              type="tel"
                              name="phone"
                              required
                              value={planningFormData.phone}
                              onChange={handlePlanningInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                              placeholder="(555) 123-4567"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Event Type *
                          </label>
                          <select
                              name="eventType"
                              required
                              value={planningFormData.eventType}
                              onChange={handlePlanningInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          >
                              <option value="">Select event type</option>
                              <option value="wedding">Wedding</option>
                              <option value="corporate">Corporate Event</option>
                              <option value="birthday">Birthday Party</option>
                              <option value="anniversary">Anniversary</option>
                              <option value="other">Other</option>
                          </select>
                      </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Event Date *
                          </label>
                          <input
                              type="date"
                              name="eventDate"
                              required
                              value={planningFormData.eventDate}
                              onChange={handlePlanningInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Guest Count *
                          </label>
                          <div className="relative">
                              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                  type="number"
                                  name="guestCount"
                                  required
                                  value={planningFormData.guestCount}
                                  onChange={handlePlanningInputChange}
                                  min="1"
                                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                  placeholder="100"
                              />
                          </div>
                      </div>
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range *
                      </label>
                      <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <select
                              name="budget"
                              required
                              value={planningFormData.budget}
                              onChange={handlePlanningInputChange}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          >
                              <option value="">Select budget range</option>
                              <option value="5000-10000">$5,000 - $10,000</option>
                              <option value="10000-20000">$10,000 - $20,000</option>
                              <option value="20000-50000">$20,000 - $50,000</option>
                              <option value="50000+">$50,000+</option>
                          </select>
                      </div>
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Details
                      </label>
                      <textarea
                          name="message"
                          value={planningFormData.message}
                          onChange={handlePlanningInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="Tell us more about your vision for this event..."
                      />
                  </div>

                  <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-rose-600 hover:to-purple-600 transition-all transform hover:scale-105"
                  >
                      Submit Planning Request
                  </button>
              </form>
          )}
      </Modal>
  );
};

export default Planning;
