// behavior-score.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorScore } from '../models/BehaviorScore.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BehaviorScoreService {
  private baseUrl = environment.uri + '/api/behaviorscore';

  constructor(private http: HttpClient) {}

  addBehaviorScore(behaviorScore: BehaviorScore): Observable<BehaviorScore> {
    return this.http.post<BehaviorScore>(`${this.baseUrl}/add`, behaviorScore);
  }

  updateBehaviorScore(behaviorScore: BehaviorScore): Observable<BehaviorScore> {
    return this.http.put<BehaviorScore>(
      `${this.baseUrl}/update`,
      behaviorScore
    );
  }

  deleteBehaviorScore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getBehaviorScore(id: number): Observable<BehaviorScore> {
    return this.http.get<BehaviorScore>(`${this.baseUrl}/get/${id}`);
  }

  getAllBehaviorScores(): Observable<BehaviorScore[]> {
    return this.http.get<BehaviorScore[]>(`${this.baseUrl}/getAll`);
  }

  getBehaviorScoresByDateRange(
    date1: Date,
    date2: Date
  ): Observable<BehaviorScore[]> {
    return this.http.get<BehaviorScore[]>(
      `${this.baseUrl}/getByDateRange?date1=${date1}&date2=${date2}`
    );
  }
  addBehaviorScoreBasedOnMembership(
    idUser: number,
    idClub: number,
    behaviorScore: BehaviorScore
  ): Observable<BehaviorScore> {
    return this.http.post<BehaviorScore>(
      `${this.baseUrl}/addBehaviorScorebasedonMembership/${idUser}/${idClub}`,
      behaviorScore
    );
  }
  getBehaviorScoresByMembership(id: number): Observable<BehaviorScore[]> {
    return this.http.get<BehaviorScore[]>(
      `${this.baseUrl}/getByMembership/${id}`
    );
  }
}
