import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
//import { Membership } from '../models/membership.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  private baseUrl = environment.uri + '/api/users';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/create`, user);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }
  findUsersNotInClub(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/userNotinClub?id=${id}`);
  }
  getUsersByClubId(clubId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/userbyclub/${clubId}`);
  }
  getUsersByDepartmentId(DepartmentId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/userbydepartment/${DepartmentId}`);
  }
  getMembersWithoutDepartment(clubId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/memberwithoutdepartment/${clubId}`);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${userId}/update`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}/delete`);
  }

  /*getMembersForUser(userId: number): Observable<Membership[]> {
    return this.http.get<Membership[]>(`${this.baseUrl}/${userId}/members`);
  }*/
  getUserbyemail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/email/${email}`);
  }

  deleteUserFromDepartment(userId: number, clubId: number): Observable<User> {
    return this.http.delete<any>(`${this.baseUrl}/deleteUserFromDepartment/${userId}/${clubId}`);
  }
}
