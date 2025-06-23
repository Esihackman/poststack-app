import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  postForm!: FormGroup;
  postId!: number;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Get post ID from route
    this.postId = +this.route.snapshot.paramMap.get('id')!;

    // Initialize the form
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Load post data
    const post = this.postService.getPost(this.postId);
    if (post) {
      this.postForm.patchValue({
        title: post.title,
        body: post.body
      });
    }
  }

  onSubmit(): void {
    if (this.postForm.invalid) return;

    this.isSubmitting = true;

    this.postService.updatePost(this.postId, {
      id: this.postId,
      userId: 1, 
      ...this.postForm.value
    }).subscribe(() => {
      this.isSubmitting = false;
      this.router.navigate(['/posts']);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
