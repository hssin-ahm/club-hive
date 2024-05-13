import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventService } from 'src/app/services/eventModule/event.service';
import { ImageService } from 'src/app/services/eventModule/image.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Image } from 'src/app/model/image';
import { JwtService } from 'src/app/services/jwt.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-eventdetailscompoenent',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.scss']
})
export class EventdetailsComponent implements OnInit {

  events: any;
  image: Image;
  thisUserEmail;


  constructor(private eventService: EventService, private jwt: JwtService, private modalService: NgbModal) { }

  getEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.events.forEach(event => {
        this.eventService.getImageUrl(event.id).subscribe(imageUrl => {
          event.imageUrl = imageUrl;
        });
      });
    });
  }

  ngOnInit() {
    this.eventService.getEvents().pipe(
      mergeMap((events: any[]) => {
        this.events = events;
        return forkJoin(
          this.events.map(event =>
            this.eventService.getImageUrl(event.id).pipe(
              tap((imageUrl: string) => {
                event.imageUrl = imageUrl;
              })
            )
          )
        );
      })
    ).subscribe();
  }

  deleteEvent(eventId: number){
    this.eventService.deleteEvent(eventId).subscribe(response => {
      console.log(response);
      this.getEvents();
    });
  }
  participationSuccess = false;  // Add this line

participate(eventId: number) {
  const email = this.eventService.getEmailFromToken();
  this.eventService.getUserByEmail(email).subscribe((data: any) => {
    console.log('User data:', data);
    console.log('Event ID:', eventId);
    this.eventService.addParticipant(data.id, eventId).subscribe(participant => {
      // handle the new participant
      this.participationSuccess = true;  // Add this line
    }, error => {
      console.error('Error in addParticipant:', error);
    });
  }, error => {
    console.error('Error in getUserByEmail:', error);
  });
}

confirmParticipation(eventId: number) {
  if (confirm('Do you really want to participate in this event?')) {
    this.participate(eventId);
    if (this.participationSuccess) {  // Add this line
      alert('User participated successfully');  // Add this line
    }
  }
}

  openScrollableModal(content: TemplateRef<any>, event: any) {
    if(event.price == 0 || event.price == null){
      if (confirm('Do you really want to participate in this event?')) {
        this.participate(event.id);
      }
    } else {
      const modalRef = this.modalService.open(content, {scrollable: true});
      modalRef.componentInstance.link = 'localhost:8080/paypal/';
    }
  }
  openNewWindow() {
    window.open('http://localhost:8080/paypal/', 'Payment', 'width=600,height=600');
  }
}
