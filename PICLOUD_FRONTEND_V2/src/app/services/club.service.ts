import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Club } from '../models/club.model';
import { Test } from '../models/quiz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private apiUrl = environment.uri + '/api/club';

  constructor(private http: HttpClient) {}

  getClubs(): Observable<Club[]> {
    console.log(this.http.get<Club[]>(`${this.apiUrl}/clubs`));
    return this.http.get<Club[]>(`${this.apiUrl}/clubs`);
  }
  updateClubTest(clubId: number, newTest: any): Observable<Club> {
    return this.http.put<Club>(
      `${this.apiUrl}/updateclubtest/${clubId}`,
      newTest
    );
  }
  getClubById(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/get/${id}`);
  }
  getClubByUserid(id: number): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.apiUrl}/getbyuser/${id}`);
  }

  createClub(formData: FormData): Observable<Club> {
    return this.http.post<Club>(`${this.apiUrl}/add`, formData);
  }

  updateClub(id: number, club: Club): Observable<Club> {
    return this.http.put<Club>(`${this.apiUrl}/update/${id}`, club);
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  getClubByUserAndPresident(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/getbyuserandpresident/${id}`);
  }
}
