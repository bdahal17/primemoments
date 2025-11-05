import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import EventManagementModal from './EventManagementModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleViewEvents = () => {
    setIsEventModalOpen(true);
  };

  const handleViewUsers = () => {
    console.log('View Users clicked');
    //Todo
  };

  const handleViewAnalytics = () => {
    console.log('View Analytics clicked');
    //Todo
  };

  const handleViewSettings = () => {
    console.log('View Settings clicked');
    //Todo
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {userInfo?.firstName || 'Admin'}!</p>
      </div>

      <div className="admin-content">
        <div className="admin-card">
          <h2>Event Management</h2>
          <p>Manage all events in the system</p>
          <button className="admin-btn" onClick={handleViewEvents}>
            View Events
          </button>
        </div>

        <div className="admin-card">
          <h2>User Management</h2>
          <p>Manage user accounts and permissions</p>
          <button className="admin-btn" onClick={handleViewUsers}>
            View Users
          </button>
        </div>

        <div className="admin-card">
          <h2>Analytics</h2>
          <p>View system statistics and reports</p>
          <button className="admin-btn" onClick={handleViewAnalytics}>
            View Analytics
          </button>
        </div>

        <div className="admin-card">
          <h2>Settings</h2>
          <p>Configure system settings</p>
          <button className="admin-btn" onClick={handleViewSettings}>
            View Settings
          </button>
        </div>
      </div>

      <EventManagementModal 
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;