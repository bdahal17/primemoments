package com.planner.backend.service;

import com.planner.backend.DTO.EventDto;
import com.planner.backend.DTO.response.EventResponse;
import com.planner.backend.entity.Event;
import com.planner.backend.entity.EventStatus;
import com.planner.backend.entity.UserProfile;
import com.planner.backend.repository.EventRepository;
import com.planner.backend.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private final UserProfileRepository userProfileRepository;
    private final EventRepository eventRepository;

    public EventService(UserProfileRepository userProfileRepository, EventRepository eventRepository) {
        this.userProfileRepository = userProfileRepository;
        this.eventRepository = eventRepository;
    }

    public EventResponse createEvent(String username, EventDto eventDto) {
        UserProfile user = userProfileRepository.findUserProfileByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = Event.builder()
                .userProfile(user)
                .eventType(eventDto.getEventType())
                .eventDate(eventDto.getEventDate())
                .expectedGuests(eventDto.getExpectedGuests())
                .status(EventStatus.PENDING)
                .build();
        return convertToDto(eventRepository.save(event));
    }

    public EventResponse convertToDto(Event event) {
        EventResponse eventResponse = new EventResponse();
        eventResponse.setStatus(event.getStatus());
        eventResponse.setId(event.getId());
        eventResponse.setEventType(event.getEventType());
        eventResponse.setEventDate(event.getEventDate());
        eventResponse.setExpectedGuests(event.getExpectedGuests());
        return eventResponse;
    }
}
