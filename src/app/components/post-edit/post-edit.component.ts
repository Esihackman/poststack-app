import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
//import { Post } from '../../models/post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
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
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    this.postService.getPost(this.postId);
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
