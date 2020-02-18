import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventComponent } from './event/event.component';
import { EventsService } from '../../services/events.service';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TrimDirective } from 'src/app/directives/trim.directive';
import { UtilService } from 'src/app/services/util.service';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [EventsComponent, EventComponent, TrimDirective],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule
  ],
  providers: [
    EventsService,
    UtilService
  ]
})
export class EventsModule { }
