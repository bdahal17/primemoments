package com.planner.backend.service;

import com.planner.backend.entity.Event;
import com.planner.backend.entity.EventStatus;
import com.planner.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Component
public class EventScheduler {

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;

    @Scheduled(cron = "0 * * * * *") // Runs every minute
    public void update() {
        LocalDateTime now = LocalDateTime.now();

        List<Event> confirmedEvents = eventRepository.findByStatusAndEventDateBefore(
                EventStatus.CONFIRMED,
                now
        ).orElseThrow(() -> new RuntimeException("Error fetching events to update"));

        for (Event event : confirmedEvents) {
            event.setStatus(EventStatus.IN_PROGRESS);
            eventRepository.save(event);
        }

        List<Event> pendingEvents = eventRepository.findByStatusAndEventDateBefore(
                EventStatus.PENDING,
                now
        ).orElseThrow(() -> new RuntimeException("Error fetching events to update"));

        for (Event event : pendingEvents) {
            event.setStatus(EventStatus.CANCELLED);
            eventRepository.save(event);
        }

    }
}
