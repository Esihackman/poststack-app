import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined = undefined;
  comments: any[] = [];
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
     private location: Location
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.post = this.postService.allPosts().find(post => post.id === postId);
    this.postService.getComments(postId).subscribe({
      next: (data) => this.comments = data,
      error: () => this.error = 'Failed to load comments.'
    });
  }
  goBack(): void {
    this.location.back();
  }
}
