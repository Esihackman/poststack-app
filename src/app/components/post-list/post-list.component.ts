import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'post-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmModalComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  error: string | null = null;
  showConfirmModal = false;
  postToDelete: number | null = null;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        // this.posts = data;
        if(this.postService.allPosts().length === 0) this.postService.allPosts.set(data);
        // this.postService.allPosts.set(data);  
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
        this.error = 'Failed to load posts. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  promptDelete(id: number): void {
    this.postToDelete = id;
    this.showConfirmModal = true;
  }

  handleDeleteConfirm(confirm: boolean): void {
    if (confirm && this.postToDelete !== null) {
      this.postService.deletePost(this.postToDelete).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== this.postToDelete);
          this.resetModal();
        },
        error: (err) => {
          console.error('Error deleting post:', err);
          this.error = 'Failed to delete post.';
          this.resetModal();
        }
      });
    } else {
      this.resetModal();
    }
  }

  private resetModal() {
    this.showConfirmModal = false;
    this.postToDelete = null;
  }
  currentPage = 1;
postsPerPage = 10;

loadPosts(): void {
  this.isLoading = true;
  this.postService.getPosts(this.currentPage, this.postsPerPage).subscribe({
    next: (data) => {
      this.posts = data;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error fetching posts:', err);
      this.error = 'Failed to load posts.';
      this.isLoading = false;
    }
  });
}

nextPage() {
  this.currentPage++;
  this.loadPosts();
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.loadPosts();
  }
}



}
