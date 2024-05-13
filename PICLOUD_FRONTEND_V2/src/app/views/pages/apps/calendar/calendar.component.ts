import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction';
import { EventService } from 'src/app/services/eventModule/event.service'; // Update with your actual path

interface MyEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  // Add other properties as needed
}

// Then use this type for `this.currentEvents`:



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentEvents: MyEvent[] = [];

  @ViewChild('externalEvents', {static: true}) externalEvents: ElementRef;

  calendarOptions: CalendarOptions = {
    events: this.currentEvents,
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetchEvents();
  
    // For external-events dragging
    new Draggable(this.externalEvents.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          backgroundColor: eventEl.getAttribute('bgColor'),
          borderColor: eventEl.getAttribute('bdColor')
        };
      }
    });
  }

  async fetchEvents() {
    this.eventService.getEvents().subscribe(eventsFromService => {
      console.log(eventsFromService);
      this.currentEvents = (eventsFromService as any[]).map(event => {
        let color;
        switch (event.eventType) { // Replace `eventType` with the actual property name
          case 'Hackathon':
            color = 'rgba(253,126,20,.25)';
            break;
          case 'Formation':
            color = 'rgba(241,0,117,.25)';
            break;
          case 'Dons':
            color = 'rgba(0,204,204,.25)';
            break;
          case 'Crowdfunding':
            color = 'rgb(18,182,89,.25)';
            break;
          case 'Other':
            color = 'rgba(91,71,251,.2)';
            break;
        }
  
        return {
          id: event.id.toString(),
          title: event.eventTitle,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          color: color, // Set the color property
          // Add other properties as needed
        };
      });
  
      // Update the events in the calendar options
      this.calendarOptions.events = this.currentEvents;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: Date.now().toString(), // Temporary ID until the event is saved in the backend
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'rgba(0,204,204,.25)',
        borderColor: '#00cccc'
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
   // this.currentEvents = events;
  }
}