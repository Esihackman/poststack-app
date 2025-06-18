import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = environment.apiBaseUrl;
 allPosts = signal<Post[]>([]);
  constructor(private http: HttpClient) {}

  // GET all posts with optional pagination
  getPosts(page?: number, limit?: number): Observable<Post[]> {
    if (page !== undefined && limit !== undefined) {
      return this.http.get<Post[]>(
        `${this.baseUrl}/posts?_page=${page}&_limit=${limit}`
      ).pipe(
        retry(2),
        catchError(this.handleError)
      );
    }
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // GET single post by ID
  getPost(id: number): Post {
    return this.allPosts().find(post => post.id === id)!;
  }

  // GET comments for a post
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/posts/${postId}/comments`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // UPDATE post
  updatePost(id: number, updatedPost: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, updatedPost).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // CREATE post
  createPost(post: Post): Observable<Post> {
    this.allPosts.set([post, ...this.allPosts()]);
    return this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // DELETE post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // 🔧 Error handler
  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
