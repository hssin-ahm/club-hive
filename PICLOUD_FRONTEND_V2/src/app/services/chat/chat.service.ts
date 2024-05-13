import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from './chat-message';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { JwtService } from '../jwt.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<
    ChatMessage[]
  >([]);
  url = environment.uri + '/api';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

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

  getAllUsers(currentUserEmail): Observable<any> {
    return this.http.get(this.url + '/getAllUsers/' + currentUserEmail, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  loadChat(channelName) {
    return this.http.post<Array<any>>(this.url + '/getMessages', channelName, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }
  getUserByNickname(nickname) {
    return this.http.get(this.url + '/findByNickname/' + nickname, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }
  getUserByEmail(email) {
    return this.http.get(this.url + '/findByEmail/' + email, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }

  getTheLastMsg(channelName) {
    return this.http.get(this.url + '/getlastmsg/' + channelName, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.url}/chat/upload`, formData, {
      headers: this.jwtService.createAuhtorizationHeader() || new HttpHeaders(),
      reportProgress: true,
      observe: 'events',
    });
  }

  // define function to download files
  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.url}/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
      headers: this.jwtService.createAuhtorizationHeader() || new HttpHeaders(),
    });
  }
  getclubbyuser(userId) {
    return this.http.get(this.url + '/club/getbyuser/' + userId, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }
}
