import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getPost(id: number): Observable<Post> {
  return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
}

getComments(postId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`${this.baseUrl}/posts/${postId}/comments`);
}

 }
