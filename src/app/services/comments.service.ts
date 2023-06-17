import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic, TopicComment } from './topics.service';

const baseUrl = 'https://localhost:7220/';
@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  createComment(comment: TopicComment) {
    return this.http.post(`${baseUrl}api/Comment`, comment);
  }
}
