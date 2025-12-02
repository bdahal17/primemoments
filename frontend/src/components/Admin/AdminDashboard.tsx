import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import EventManagementModal from './EventManagementModal';
import './AdminDashboard.css';
import StepperModal from "../EventPlannerStepper/StepperModal.tsx";
import {Calendar, CheckCircle, Clock, Info, MapPin, Users} from "lucide-react";
import AdminEvents from "./AdminEvents/AdminEvents.tsx";
import {getEvents} from "../../service/eventService.ts";
import {setEvents} from "../../store/eventSlice.ts";

enum DashboardTab {
  AllEvents = "All Events",
  Reviews = "Client Reviews",
  AccountSettings = "Account Settings",
  History = "History"
}

const AdminDashboard = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.AllEvents);
  const [viewDetails, setViewDetails] = useState(false);

  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const renderTabContent = () => {
    switch(activeTab) {
      case DashboardTab.AllEvents:
        return (
            <div className="w-full rounded-xl bg-white">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                  <h3 className="text-lg font-semibold">All Events!</h3>
                  <p className="text-sm text-gray-500">View all events!</p>
                </div>
              </div>
              <div>
                <AdminEvents
                    renderEventStatusBadge={renderEventStatusBadge}
                    setViewDetails={setViewDetails}
                    viewDetails={viewDetails}/>
              </div>
            </div>
        )
    }
  };

  return (
      <div className="admin-dashboard p-6">
        <div className="admin-header mb-6 pt-20">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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
                      setIsEventModalOpen(tab === DashboardTab.AllEvents);
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

export default AdminDashboard;
