import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Pager<T> {
  data: T[];
  page: number;
  total: number;
}
export interface Topic {
  id?: string;
  name: string;
  comment: string;
  status?: number;
  comments: TopicComment[]
  dueDate: string;//iso string of date
}
export interface TopicComment {
  id?:string;
  topicId: string;
  name: string;
  text: string;
}
const baseUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class TopicsService {
  constructor(private http: HttpClient) {}

  getTopic(topicId: string): Observable<Topic> {
    return this.http.get<Topic>(`${baseUrl}api/topics/${topicId}`);
  }

  topics(): Observable<Pager<Topic>> {
    return this.http.get<Pager<Topic>>(`${baseUrl}api/topics`);
  }

  createTopic(topic: Topic) {
    return this.http.post(`${baseUrl}api/topics`, topic);
  }

  updateTopic(topic: Topic) {
    return this.http.post(`${baseUrl}api/topics/${topic.id}`, topic);
  }
}
