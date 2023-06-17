import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, shareReplay } from 'rxjs';

export interface Topic {
  id?: string;
  name: string;
  comment: string;
  status?: number;
  comments: TopicComment[]
}
export interface TopicComment {
  id?:string;
  topicId: string;
  name: string;
  text: string;
}
const baseUrl = 'https://localhost:7220/';
@Injectable({ providedIn: 'root' })
export class TopicsService {
  constructor(private http: HttpClient) {}

  topics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${baseUrl}api/topics`);
  }

  createTopic(topic: Topic) {
    return this.http.post(`${baseUrl}api/topics`, topic);
  }

  updateTopic(topic: Topic) {
    return this.http.post(`${baseUrl}api/topics/${topic.id}`, topic);
  }
}
