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
export interface Topic {
  id?: string;
  name: string;
  comment: string;
  comments: TopicComment[];
  addedDate: string; //iso string of date
  dueDate: string; //iso string of date
  status: TopicStatus;
}
export interface TopicComment {
  id?: string;
  topicId: string;
  name: string;
  text: string;
  updatedDate: string;
}

const baseUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class TopicsService {
  constructor(private http: HttpClient) {}

  getTopic(topicId: string): Observable<Topic> {
    return this.http.get<Topic>(`${baseUrl}api/topics/${topicId}`);
  }

  topics(page = 0, from?: moment.Moment, to?: moment.Moment): Observable<Pager<Topic>> {
    const dateFrom = from ? from.toISOString() : '';
    const dateTo = to ? to.toISOString() : '';
    return this.http.get<Pager<Topic>>(`${baseUrl}api/topics?page=${page}${dateFrom ? '&dateFrom=' + dateFrom : ''}${dateTo ? '&dateTo=' + dateTo : ''}`);//.pipe(shareReplay(1));
  }

  overdoTopics(page = 0): Observable<Pager<Topic>> {

    return this.http.get<Pager<Topic>>(`${baseUrl}api/topics/overdo?page=${page}`);
  }

  createTopic(topic: Topic) {
    return this.http.post(`${baseUrl}api/topics`, topic);
  }

  updateTopic(topic: Topic) {
    return this.http.post(`${baseUrl}api/topics/${topic.id}`, topic);
  }
}
