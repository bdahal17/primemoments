package com.planner.backend.service;

import com.planner.backend.DTO.EventDto;
import com.planner.backend.DTO.EventNoteDto;
import com.planner.backend.DTO.RatingDto;
import com.planner.backend.DTO.response.EventResponse;
import com.planner.backend.DTO.response.LocationResponse;
import com.planner.backend.DTO.response.RatingResponse;
import com.planner.backend.entity.*;
import com.planner.backend.repository.EventRepository;
import com.planner.backend.repository.LocationRepository;
import com.planner.backend.repository.RatingRepository;
import com.planner.backend.repository.UserProfileRepository;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EventService {

    @Value("${app-password}")
    private String appPassword;

    private final UserProfileRepository userProfileRepository;
    private final EventRepository eventRepository;
    private final LocationRepository locationRepository;
    private final RatingRepository ratingRepository;

    public EventService(UserProfileRepository userProfileRepository,
                        EventRepository eventRepository,
                        LocationRepository locationRepository,
                        RatingRepository ratingRepository) {
        this.userProfileRepository = userProfileRepository;
        this.eventRepository = eventRepository;
        this.locationRepository = locationRepository;
        this.ratingRepository = ratingRepository;
    }

    public List<EventResponse> getAllEvents() {
        List<Event> events = eventRepository.findAllByOrderByEventDateDesc().orElseThrow(() -> new RuntimeException("No events found"));
        return events.stream().map(this::convertToResponse).toList();
    }

    public EventResponse updateEvent(String username, Long eventId, String content) {
        try {
            UserProfile user = userProfileRepository.findUserProfileByEmail(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Event event = eventRepository.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            if(user.getRoles().stream().anyMatch(role -> role.getName().equals("USER")) && !Objects.equals(event.getUserProfile().getEmail(), username)) {
                throw new RuntimeException("Unauthorized to update this event");
            }

            EventNote note = EventNote.builder()
                    .title("Update Note")
                    .content(content)
                    .userProfile(user)
                    .event(event)
                    .build();

            event.getNotes().add(note);

            return convertToResponse(eventRepository.save(event));

        } catch (Exception e) {
            throw new RuntimeException("Error updating event: " + e.getMessage());
        }
    }

    public RatingResponse addRating(String username, RatingDto ratingDto) {
        try {
            UserProfile user = userProfileRepository.findUserProfileByEmail(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Event event = eventRepository.findById(ratingDto.getEventId())
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            if (event.getStatus() != EventStatus.CONFIRMED) {
                throw new RuntimeException("Cannot rate an event that is not completed");
            }

            if(!Objects.equals(event.getUserProfile(), user)) {
                throw new RuntimeException("Unauthorized to rate this event");
            }

            Rating existingRating = ratingRepository.findByEventAndUserProfile(event, user).orElse(null);

            Rating rating;

            if (existingRating != null) {
                // Update existing rating
                existingRating.setRatingValue(ratingDto.getRating());
                existingRating.setComment(ratingDto.getComment());
                existingRating.setPublicComment(ratingDto.isPublicComment());
                existingRating.setUpdatedAt(LocalDateTime.now());

                rating = existingRating;

            } else {
                // Create new rating
                rating = Rating.builder()
                        .ratingValue(ratingDto.getRating())
                        .comment(ratingDto.getComment())
                        .publicComment(ratingDto.isPublicComment())
                        .active(false)
                        .userProfile(user)
                        .event(event)
                        .createdAt(LocalDateTime.now())
                        .build();
            }

            ratingRepository.save(rating);

            RatingResponse ratingResponse = new RatingResponse();
            ratingResponse.setId(rating.getId());
            ratingResponse.setScore(rating.getRatingValue());
            ratingResponse.setComment(rating.getComment());
            ratingResponse.setActive(rating.isActive());
            ratingResponse.setPublicComment(rating.isPublicComment());

            return ratingResponse;

        } catch (Exception e) {
            throw new RuntimeException("Error adding rating: " + e.getMessage());
        }
    }

    public EventResponse createEvent(String username, EventDto eventDto) {

        try {
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

            HtmlEmail email = new HtmlEmail();
            email.setHostName("smtp.gmail.com");
            email.setSmtpPort(587);
            email.setStartTLSEnabled(true);

            email.setFrom("bdahal17@gmail.com");
            email.addTo("officialrtaff@gmail.com");
            email.setSubject("New Event Created - GG Decor");

            email.setAuthentication("bdahal17@gmail.com", "cpdr rprz zeiy lzud");

            String htmlTemplate = createNewEventNotificationTemplate(evnt, location, user);
            email.setHtmlMsg(htmlTemplate);

            email.send();
            System.out.println("New event notification email sent successfully!");

            return convertToResponse(evnt);
        } catch (Exception e) {
            // Log the error, but don't interrupt the event creation process
            System.err.println("Failed to send new event notification email: " + e.getMessage());
        }


        return null;
    }


    public List<EventResponse> getEventsForUser(String username) {
        UserProfile user = userProfileRepository.findUserProfileByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Event> events = eventRepository.findAllByUserProfileOrderByEventDateDesc(user).orElseThrow(() -> new RuntimeException("No events found for user"));
        return events.stream().map(this::convertToResponse).toList();
    }

    public EventResponse approveEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setStatus(EventStatus.CONFIRMED);

        return convertToResponse(eventRepository.save(event));
    };

    public EventResponse convertToResponse(Event event) {
        EventResponse eventResponse = new EventResponse();
        eventResponse.setStatus(event.getStatus());
        eventResponse.setId(event.getId());
        eventResponse.setEventType(event.getEventType());
        eventResponse.setEventDate(event.getEventDate());
        eventResponse.setExpectedGuests(event.getExpectedGuests());
        eventResponse.setContactName(event.getContactName());
        eventResponse.setContactPhone(event.getContactNumber());
        eventResponse.setCreatedBy(event.getUserProfile().getEmail());

        List<EventNoteDto> noteDtos = event.getNotes().stream().map(note -> {
            EventNoteDto noteDto = new EventNoteDto();
            noteDto.setId(note.getId());
            noteDto.setEventId(note.getEvent().getId());
            noteDto.setTitle(note.getTitle());
            noteDto.setContent(note.getContent());
            noteDto.setCreatedAt(note.getCreatedAt());
            noteDto.setUser(note.getUserProfile().getFirstName());
            return noteDto;
        }).toList();

        eventResponse.setNoteDto(noteDtos);

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
            eventResponse.setVenueAddress(location.getAddressLine1());
        });

        Optional<Rating> rating = ratingRepository.findByEvent(event);
        rating.ifPresent(r -> {
            RatingResponse ratingResponse = new RatingResponse();
            ratingResponse.setId(r.getId());
            ratingResponse.setScore(r.getRatingValue());
            ratingResponse.setComment(r.getComment());
            ratingResponse.setActive(r.isActive());
            ratingResponse.setPublicComment(r.isPublicComment());
            eventResponse.setRating(ratingResponse);
        });

        return eventResponse;
    }

    private String createNewEventNotificationTemplate(Event event, Location location, UserProfile userProfile) {
        try {
            StringBuilder htmlTemplate = new StringBuilder();
            htmlTemplate.append("<!DOCTYPE html>\n")
                    .append("<html lang='en'>\n")
                    .append("<head>\n")
                    .append("    <meta charset='UTF-8'>\n")
                    .append("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n")
                    .append("    <title>GG Decor - New Event Created</title>\n")
                    .append("</head>\n")
                    .append("<body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;'>\n")
                    .append("    <div style='background-color: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;'>\n")
                    .append("        <div style='background-color: #4A90E2; color: white; padding: 20px; text-align: center;'>\n")
                    .append("            <h1 style='margin: 0; font-size: 24px;'>GG Decor</h1>\n")
                    .append("            <p style='margin: 5px 0 0; font-size: 14px;'>New Event Created</p>\n")
                    .append("        </div>\n")
                    .append("        <div style='padding: 20px;'>\n")
                    .append("            <h2 style='color: #333; border-bottom: 2px solid #4A90E2; padding-bottom: 10px;'>Event Details</h2>\n")
                    .append("            <table style='width: 100%; border-collapse: collapse;'>\n")
                    .append("                <tr>\n")
                    .append("                    <td style='padding: 10px; width: 30%; color: #666;'>Event Type:</td>\n")
                    .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", event.getEventType()))
                    .append("                </tr>\n")
                    .append("                <tr style='background-color: #f9f9f9;'>\n")
                    .append("                    <td style='padding: 10px; color: #666;'>Event Date:</td>\n")
                    .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", event.getEventDate()))
                    .append("                </tr>\n")
                    .append("                <tr>\n")
                    .append("                    <td style='padding: 10px; color: #666;'>Expected Guests:</td>\n")
                    .append(String.format("                    <td style='padding: 10px; color: #333;'>%d</td>\n", event.getExpectedGuests()))
                    .append("                </tr>\n")
                    .append("                <tr style='background-color: #f9f9f9;'>\n")
                    .append("                    <td style='padding: 10px; color: #666;'>Event Status:</td>\n")
                    .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", event.getStatus()))
                    .append("                </tr>\n")
                    .append("                <tr>\n")
                    .append("                    <td style='padding: 10px; color: #666;'>Location:</td>\n")
                    .append(String.format("                    <td style='padding: 10px; color: #333;'>%s, %s, %s, %s</td>\n",
                            location.getAddressLine1(),
                            location.getCity(),
                            location.getPostalCode(),
                            location.getCountry()))
                    .append("                </tr>\n")
                    .append("            </table>\n")
                    .append("        </div>\n")
                    .append("        <div style='padding: 20px;'>\n")
                    .append("            <h2 style='color: #333; border-bottom: 2px solid #4A90E2; padding-bottom: 10px;'>Client Information</h2>\n")
                    .append("            <table style='width: 100%; border-collapse: collapse;'>\n")
                    .append("                <tr>\n")
                    .append("                    <td style='padding: 10px; width: 30%; color: #666;'>Contact Name:</td>\n")
                    .append(String.format("                    <td style='padding: 10px; color: #333;'>%s </td>\n", event.getContactName()))
                    .append("                </tr>\n")
                    .append("                <tr style='background-color: #f9f9f9;'>\n")
                    .append("                    <td style='padding: 10px; color: #666;'>Contact Email:</td>\n")
                    .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", userProfile.getEmail()))
                    .append("                </tr>\n")
                    .append("                <tr>\n")
                    .append("                    <td style='padding: 10px; color: #666;'>Phone:</td>\n")
                    .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", event.getContactNumber()))
                    .append("                </tr>\n")
                    .append("            </table>\n")
                    .append("        </div>\n")
                    .append("        <div style='background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #666;'>\n")
                    .append("            © 2024 GG Decor. All rights reserved.\n")
                    .append("        </div>\n")
                    .append("    </div>\n")
                    .append("</body>\n")
                    .append("</html>");

            return htmlTemplate.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error creating email template: " + e.getMessage());
        }
    }
}
