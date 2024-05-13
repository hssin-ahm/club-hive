import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Membership } from '../models/membership.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private apiUrl = environment.uri + '/api/members';

  constructor(private http: HttpClient) { }

  getAllMembers(): Observable<Membership[]> {
    return this.http.get<Membership[]>(`${this.apiUrl}`);
  }

  addMember(membership: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, membership);
  }

  updateMember(membership: Membership): Observable<Membership> {
    return this.http.put<Membership>(`${this.apiUrl}/update`, membership);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getMemberById(id: number): Observable<Membership> {
    return this.http.get<Membership>(`${this.apiUrl}/${id}`);
  }

  getMemberByClub(id: number): Observable<Membership[]> {
    return this.http.get<Membership[]>(`${this.apiUrl}/memberbyclub/${id}`);
  }

  getMemberByDepartment(id: number): Observable<Membership[]> {
    return this.http.get<Membership[]>(`${this.apiUrl}/memberbydepartment/${id}`);
  }

  assignUsersToDepartment(userIds: number[] | null , departmentId: number | null, clubId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/assignUsersToDepartment/${departmentId}/${clubId}`, userIds);
  }
  deleteMemberByUserId_ClubId(userId: number, clubId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/deletem/${userId}/${clubId}`);
  }
  getMembershipByUserAndClub(idUser: number, idClub: number): Observable<Membership> {
    return this.http.get<Membership>(`${this.apiUrl}/getMembershipbyCandU/${idUser}/${idClub}`);
  }
}
