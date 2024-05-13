import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/eventModule/event.service';
import { ImageService } from 'src/app/services/eventModule/image.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Image } from 'src/app/model/image';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-eventdetailadmin',
  templateUrl: './eventdetailadmin.component.html',
  styleUrls: ['./eventdetailadmin.component.scss']
})
export class EventdetailadminComponent implements OnInit {

  events: any;
  image: Image;
  thisUserEmail;

  
  

  constructor(private eventService: EventService, private jwt: JwtService) { }

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
  //participate(userId: number ,enventId: number){
  //  this.jwtService.addParticipant(userId, enventId).subscribe(response => {
  //    console.log(response);
  //  });
    
  //}
  


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
  participate(eventId: number) {
    const email = this.eventService.getEmailFromToken();
    this.eventService.getUserByEmail(email).subscribe((data: any) => {
      this.eventService.addParticipant(data.id, eventId).subscribe(participant => {
        // handle the new participant
      });
    });
  }

}
