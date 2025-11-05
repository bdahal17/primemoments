import { useState } from 'react';
import './EventManagementModal.css';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';
}

interface EventManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventManagementModal = ({ isOpen, onClose }: EventManagementModalProps) => {
  // Test data
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Corporate Annual Meeting",
      date: "2025-11-15",
      location: "Conference Center A",
      attendees: 150,
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Product Launch Event",
      date: "2025-11-20",
      location: "Main Auditorium",
      attendees: 300,
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Team Building Workshop",
      date: "2025-11-10",
      location: "Training Room 3",
      attendees: 45,
      status: "In Progress"
    },
    {
      id: 4,
      title: "Holiday Gala",
      date: "2025-12-20",
      location: "Grand Ballroom",
      attendees: 500,
      status: "Upcoming"
    },
    {
      id: 5,
      title: "Q3 Review Meeting",
      date: "2025-10-30",
      location: "Board Room",
      attendees: 25,
      status: "Completed"
    },
    {
      id: 6,
      title: "Client Appreciation Dinner",
      date: "2025-11-05",
      location: "Restaurant Plaza",
      attendees: 80,
      status: "Cancelled"
    },
  ]);

  const handleEdit = (eventId: number) => {
    console.log('Edit event:', eventId);
    // Todo
  };

  const handleDelete = (eventId: number) => {
    console.log('Delete event:', eventId);
    // Todo
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'status-upcoming';
      case 'In Progress':
        return 'status-progress';
      case 'Completed':
        return 'status-completed';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Event Management</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="events-grid">
            <div className="grid-header">
              <div>ID</div>
              <div>Event Title</div>
              <div>Date</div>
              <div>Location</div>
              <div>Attendees</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            
            {events.map((event) => (
              <div key={event.id} className="grid-row">
                <div>{event.id}</div>
                <div className="event-title">{event.title}</div>
                <div>{new Date(event.date).toLocaleDateString()}</div>
                <div>{event.location}</div>
                <div>{event.attendees}</div>
                <div>
                  <span className={`status-badge ${getStatusClass(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <div className="actions">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="add-event-btn">+ Add New Event</button>
          <button className="cancel-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventManagementModal;