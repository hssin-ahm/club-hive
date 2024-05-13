import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestToJoin } from '../models/RequestToJoin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestToJoinService {
  private baseUrl = environment.uri + '/api/requestToJoin'; // Update this URL

  constructor(private http: HttpClient) {}

  createRequestToJoin(requestToJoin: any): Observable<RequestToJoin> {
    return this.http.post<RequestToJoin>(this.baseUrl, requestToJoin);
  }

  getRequestToJoinById(id: number): Observable<RequestToJoin> {
    return this.http.get<RequestToJoin>(`${this.baseUrl}/${id}`);
  }

  getAllRequestsToJoin(): Observable<RequestToJoin[]> {
    return this.http.get<RequestToJoin[]>(this.baseUrl);
  }

  deleteRequestToJoin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getRequestsToJoinByUserId(userId: number): Observable<RequestToJoin[]> {
    return this.http.get<RequestToJoin[]>(
      `${this.baseUrl}/getByUserId/${userId}`
    );
  }

  getRequestsToJoinByClubId(clubId: number): Observable<RequestToJoin[]> {
    return this.http.get<RequestToJoin[]>(
      `${this.baseUrl}/getByClubId/${clubId}`
    );
  }

  updateRequestToJoin(requestToJoin: RequestToJoin): Observable<RequestToJoin> {
    return this.http.put<RequestToJoin>(
      `${this.baseUrl}/update`,
      requestToJoin
    );
  }
}
