package com.planner.backend.service;

import com.planner.backend.DTO.EventDto;
import com.planner.backend.DTO.LocationDto;
import com.planner.backend.DTO.response.EventResponse;
import com.planner.backend.DTO.response.LocationResponse;
import com.planner.backend.entity.*;
import com.planner.backend.repository.EventNoteRepository;
import com.planner.backend.repository.EventRepository;
import com.planner.backend.repository.LocationRepository;
import com.planner.backend.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final UserProfileRepository userProfileRepository;
    private final EventRepository eventRepository;
    private final LocationRepository locationRepository;

    public EventService(UserProfileRepository userProfileRepository,
                        EventRepository eventRepository,
                        LocationRepository locationRepository) {
        this.userProfileRepository = userProfileRepository;
        this.eventRepository = eventRepository;
        this.locationRepository = locationRepository;
    }

    public EventResponse createEvent(String username, EventDto eventDto) {
        UserProfile user = userProfileRepository.findUserProfileByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = Event.builder()
                .eventType(eventDto.getEventType())
                .eventDate(eventDto.getEventDateTime())
                .contactName(eventDto.getContactName())
                .contactNumber(eventDto.getContactNumber())
                .expectedGuests(eventDto.getExpectedGuests())
                .status(EventStatus.PENDING)
                .userProfile(user)
                .build();

        EventNote note = EventNote.builder()
                .title("Initial Note")
                .content(eventDto.getAdditionalNotes())
                .userProfile(user)
                .event(event) // will set event later
                .build();

        event.getNotes().add(note);

        Event evnt = eventRepository.save(event);

        Location location = Location.builder()
                .name("Event Location")
                .description("Location for the event")
                .addressLine1(eventDto.getLocation().getAddressLine1()) // populate as needed
                .addressLine2(eventDto.getLocation().getAddressLine2())
                .city(eventDto.getLocation().getCity())
                .state(eventDto.getLocation().getState())
                .postalCode(eventDto.getLocation().getPostalCode())
                .country(eventDto.getLocation().getCountry())
                .event(evnt)
                .build();

        locationRepository.save(location);


        return convertToDto(evnt);
    }


    public List<EventResponse> getEventsForUser(String username) {
        UserProfile user = userProfileRepository.findUserProfileByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Event> events = eventRepository.findAllByUserProfileOrderByEventDateDesc(user);
        return events.stream().map(this::convertToDto).toList();
    }

    public EventResponse convertToDto(Event event) {
        EventResponse eventResponse = new EventResponse();
        eventResponse.setStatus(event.getStatus());
        eventResponse.setId(event.getId());
        eventResponse.setEventType(event.getEventType());
        eventResponse.setEventDate(event.getEventDate());
        eventResponse.setExpectedGuests(event.getExpectedGuests());

        Optional<Location> locationOpt = locationRepository.findByEvent(event);
        locationOpt.ifPresent(location -> {
            LocationResponse locationResponse = new LocationResponse();
            locationResponse.setId(location.getId());
            locationResponse.setName(location.getName());
            locationResponse.setDescription(location.getDescription());
            locationResponse.setAddressLine1(location.getAddressLine1());
            locationResponse.setAddressLine2(location.getAddressLine2());
            locationResponse.setCity(location.getCity());
            locationResponse.setState(location.getState());
            locationResponse.setPostalCode(location.getPostalCode());
            locationResponse.setCountry(location.getCountry());
            eventResponse.setLocation(locationResponse);
        });
        return eventResponse;
    }
}
