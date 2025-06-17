import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: any[] = [];
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(postId).subscribe({
      next: (data) => this.post = data,
      error: () => this.error = 'Failed to load post.'
    });

    this.postService.getComments(postId).subscribe({
      next: (data) => this.comments = data,
      error: () => this.error = 'Failed to load comments.'
    });
  }
}
