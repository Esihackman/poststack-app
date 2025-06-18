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

 updatePost(id: number, updatedPost: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, updatedPost);
  }

  createPost(post: Partial<Post>): Observable<Post> {
  return this.http.post<Post>(`${this.baseUrl}/posts`, post);
}

deletePost(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/posts/${id}`);
}

 }
