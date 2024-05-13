import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt.service';
import { FormBuilder } from '@angular/forms';
import { ImageService } from './image.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const EVENTURL = environment.uri + '/event/';
const IMAGEURL = environment.uri + '/cloudinary/';
const PARTICIPANTURL = environment.uri + '/participant/';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private http: HttpClient,
    private jwt: JwtService,
    private formBuilder: FormBuilder
  ) {}

  getEvents() {
    return this.http.get(EVENTURL + 'getAllEvents');
  }

  getEventById(eventId: number) {
    return this.http.get(EVENTURL + 'getEvent/' + eventId);
  }
  getEventsByEventType(eventType: string) {
    return this.http.get(EVENTURL + 'getEventsByeventType/' + eventType);
  }
  addEvent(event: any): Observable<any> {
    return this.http.post(EVENTURL + 'addEvent', event).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }

  // addEvent(event: any){
  //   return this.http.post(EVENTURL + 'addEvent', event);
  // }
  deleteEvent(eventId: number) {
    return this.http.delete(EVENTURL + 'deleteEvent/' + eventId);
  }
  public upload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.http.post<any>(IMAGEURL + 'upload', formData);
  }

  getImageUrl(id: number): Observable<any> {
    return this.http
      .get(IMAGEURL + 'imageurl/' + (id + 1), { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error status:', error.status);
          console.error('Error body:', error.error);
          return throwError(error);
        })
      );
  }

  getUserByEmail(email) {
    return this.http.get(EVENTURL + 'findByEmail/' + email, {
      headers: this.jwt.createAuhtorizationHeader(),
    });
  }
  getEmailFromToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return null;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    console.log(payload);

    return payload.sub;
  }
  addParticipant(userId: number, eventId: number): Observable<any> {
    const body = {
      userId: userId,
      eventId: eventId,
    };
    return this.http.post(PARTICIPANTURL + 'addParticipant', body);
  }
}
