import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Finance } from '../models/Finance.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = environment.uri + '/api/finances'; // replace with the actual URL to your backend

  constructor(private http: HttpClient) { }

  addFinance(finance: Finance): Observable<Finance> {
    return this.http.post<Finance>(`${this.apiUrl}/add`, finance);
  }

  updateFinance(finance: Finance): Observable<Finance> {
    return this.http.put<Finance>(`${this.apiUrl}/update`, finance);
  }

  deleteFinance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getFinance(id: number): Observable<Finance> {
    return this.http.get<Finance>(`${this.apiUrl}/get/${id}`);
  }

  getAllFinances(): Observable<Finance[]> {
    return this.http.get<Finance[]>(`${this.apiUrl}/all`);
  }
  getFinanceByClubId(id: number): Observable<Finance[]> {
    return this.http.get<Finance[]>(`${this.apiUrl}/getbyclub/${id}`);
  }
}