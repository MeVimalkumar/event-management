import { Injectable } from '@angular/core';
import { EventData } from '../schemas/event-data';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  addEvent(event: EventData): void {
    event.id = new Date().getTime();
    localStorage.setItem(event.id.toString(), JSON.stringify(event));
  }

  updateEvent(event: EventData): void {
    localStorage.setItem(event.id.toString(), JSON.stringify(event));
  }

  deleteEvent(eventId: number): void {
    localStorage.removeItem(eventId.toString());
  }

  getEvent(eventId: number): EventData {
    let eventData = localStorage.getItem(eventId.toString());
    if (eventData) {
      return JSON.parse(eventData);
    } else {
      return {};
    }
  }

  getAllEvents(): EventData[] {
    const eventsLen = localStorage.length;
    const events: EventData[] = [];
    for (let index = 0; index < eventsLen; index++) {
      events.push(JSON.parse(localStorage.getItem(localStorage.key(index))));
    }
    return events;
  }

}
