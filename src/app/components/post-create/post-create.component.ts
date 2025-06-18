import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Add this
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  postForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
     private location: Location
  ) {
    this.postForm = this.fb.group({
      title: '', 
      body: ''
    });
  }

  onSubmit() {
    if (this.postForm.invalid) return;

    this.isSubmitting = true;

    this.postService.createPost(this.postForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to create post.';
        this.isSubmitting = false;
      }
    });
  
  }
  goBack(): void {
    this.location.back();
  }
}
