import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TopicStatus } from '../shared/models/topic-status.enum';

export interface Pager<T> {
  data: T[];
  page: number;
  total: number;
}
export interface Goal {
  id?: string;
  name: string;
  comment: string;
  addedDate: string; //iso string of date
  dueDate: string; //iso string of date
  updatedDate: string; //iso string of date
  status: TopicStatus;
}


const baseUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class GoalsService {
  constructor(private http: HttpClient) {}

  getTopic(topicId: string): Observable<Goal> {
    return this.http.get<Goal>(`${baseUrl}api/goals/${topicId}`);
  }

  goals(page = 0, from?: moment.Moment, to?: moment.Moment): Observable<Pager<Goal>> {
    const dateFrom = from ? from.toISOString() : '';
    const dateTo = to ? to.toISOString() : '';
    return this.http.get<Pager<Goal>>(`${baseUrl}api/goals?page=${page}${dateFrom ? '&dateFrom=' + dateFrom : ''}${dateTo ? '&dateTo=' + dateTo : ''}`);//.pipe(shareReplay(1));
  }



  createGoal(goal: Goal) {
    return this.http.post(`${baseUrl}api/goals`, goal);
  }

  updateGoal(goal: Goal) {
    return this.http.post(`${baseUrl}api/goals`, goal);
  }
}
