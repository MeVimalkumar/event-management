import { Component, OnInit, ViewChild } from '@angular/core';
import { EventData } from 'src/app/schemas/event-data';
import { UtilService } from 'src/app/services/util.service';
import { EventsService } from 'src/app/services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { LocationData } from 'src/app/schemas/location-data';
import { Guest } from 'src/app/schemas/guest';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  eventData: EventData;
  groupAddress: string = "";
  guestData: Guest;

  constructor(private readonly utilService: UtilService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventsService: EventsService) {
    this.eventData = { guests: [] }
    this.guestData = {};
  }

  navigateToEvents(): void {
    this.router.navigate(['/'], { fragment: 'events' })
  }

  addGuestBtnHandler($event, guestForm) {
    if (this.utilService.isFormValid(guestForm)) {
      this.eventData.guests.push(this.guestData);
    }
  }

  submitBtnHandler($event, eventForm): void {
    if (this.utilService.isFormValid(eventForm)) {
      if (this.eventData.id) {
        this.eventsService.updateEvent(this.eventData);
      } else {
        this.eventsService.addEvent(this.eventData);
      }
      this.navigateToEvents();
    }
  }
  handleAddressChange(address: Address) {
    this.eventData.location = this.getlocationDatails(address);
  }

  getlocationDatails(address: Address): LocationData {
    const locationData: LocationData = {};
    locationData.latitude = "";
    locationData.longitude = "";
    // get longititude for the selected address
    if (address != null && address.geometry != null && address.geometry.location.lng()) {
      locationData.longitude = address.geometry.location.lng()
    }
    // get latitude for the selected address
    if (address != null && address.geometry != null && address.geometry.location.lat()) {
      locationData.latitude = address.geometry.location.lat()
    }
    let xmlDoc: any = this.utilService.xmlParser(address['adr_address']);
    for (let field of xmlDoc.getElementsByTagName("span")) {
      switch (field["classList"][0]) {
        case "street-address": {
          let streetAddress = field.innerHTML.toString().split(" ");
          locationData.address = "";
          for (let i = 0; i < streetAddress.length; i++) {
            if (i == 0) {
              locationData.streetNumber = streetAddress[i];
            } else {
              // locationData.address = streetAddress[i];
              locationData.address += streetAddress[i] + " ";
            }
          }
          locationData.address = locationData.address.trim();
          break;
        }

        case "locality": {
          locationData.city = field.innerHTML.trim();
          break;
        }

        case "region": {
          locationData.state = field.innerHTML.trim();
          break;
        }

        case "postal-code": {
          locationData.zipcode = field.innerHTML.split("-")[0].trim();
          break;
        }

        case "country-name": {
          locationData.country = field.innerHTML.trim();
          break;
        }
      }
    }
    return locationData
  }


  concatAddress() {
    this.groupAddress = "";
    if (this.eventData.location['streetNumber']) {
      this.groupAddress += this.eventData.location['streetNumber'] + " ";
    }
    if (this.eventData.location['address']) {
      this.groupAddress += this.eventData.location['address'] + ", ";
    }
    if (this.eventData.location['city']) {
      this.groupAddress += this.eventData.location['city'] + ", ";
    }
    if (this.eventData.location['state']) {
      this.groupAddress += this.eventData.location['state'];
    }
    if (this.eventData.location['zipcode']) {
      this.groupAddress += this.eventData.location['zipcode'];
    }
  }

  removeGuest(guestIndex) {
    this.eventData.guests.splice(guestIndex, 1);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(q => {
      if (q && q.id) {
        const eventData = this.eventsService.getEvent(q.id);
        if (Object.keys(eventData).length) {
          this.eventData = eventData;
          if (!this.eventData.guests) {
            this.eventData.guests = []
          }
          this.concatAddress();
        } else {
          this.router.navigate(['events/add'])
        }
      }
    })
  }

}
