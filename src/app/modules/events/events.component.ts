import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { EventData } from 'src/app/schemas/event-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: EventData[];
  constructor(private readonly eventsService: EventsService,
    private readonly route: ActivatedRoute) {
    this.events = []
  }

  deleteEvent(eventId: number, eventIndex: number): void {
    this.eventsService.deleteEvent(eventId);
    this.events.splice(eventIndex, 1);
  }

  ngOnInit(): void {
    this.events = this.eventsService.getAllEvents();
  }

}
