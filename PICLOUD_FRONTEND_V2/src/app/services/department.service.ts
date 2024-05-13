import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = environment.uri + '/api/department';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`);
  }

  getDepartmentsbyclub(id: number): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/getbyclub/${id}`);
  }
  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/get/${id}`);
  }
  getResponsableId(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/responsable/${id}`);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/add`, department);
  }

  addDepartment(
    department: Department,
    idclub: number,
    iduser: number
  ): Observable<Department> {
    return this.http.put<Department>(
      `${this.apiUrl}/create/${idclub}/${iduser}`,
      department
    );
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/update`, department);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  assignUsersToDepartment(
    userIds: number[] | null,
    departmentId: number | null,
    clubId: number
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/assignUsersToDepartment/${departmentId}/${clubId}`,
      userIds
    );
  }
}
