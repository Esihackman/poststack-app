import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = environment.apiBaseUrl;

  // Reactive signal to store and update post list
  allPosts = signal<Post[]>([]);

  constructor(private http: HttpClient) {}

  // GET all posts with optional pagination
  getPosts(page?: number, limit?: number): Observable<Post[]> {
    const url =
      page !== undefined && limit !== undefined
        ? `${this.baseUrl}/posts?_page=${page}&_limit=${limit}`
        : `${this.baseUrl}/posts`;

    return this.http.get<Post[]>(url).pipe(
      tap((posts) => this.allPosts.set(posts)), // populate signal
      retry(2),
      catchError(this.handleError)
    );
  }

  // GET single post from signal by ID
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

  // UPDATE post and update the local signal
  updatePost(id: number, updatedPost: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, updatedPost).pipe(
      tap((updated) => {
        const updatedList = this.allPosts().map(post =>
          post.id === id ? updated : post
        );
        this.allPosts.set(updatedList);
      }),
      retry(2),
      catchError(this.handleError)
    );
  }

  // CREATE post and update the local signal
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(
      tap((created) => {
        this.allPosts.set([created, ...this.allPosts()]);
      }),
      retry(2),
      catchError(this.handleError)
    );
  }

  // DELETE post and update the local signal
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`).pipe(
      tap(() => {
        this.allPosts.set(this.allPosts().filter(post => post.id !== id));
      }),
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
