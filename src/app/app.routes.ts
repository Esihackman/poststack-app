import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
// You can import more components as you build them
// import { PostDetailComponent } from './post-detail/post-detail.component';
// import { PostEditComponent } from './post-edit/post-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent },
  // { path: 'posts/:id', component: PostDetailComponent },
  // { path: 'posts/:id/edit', component: PostEditComponent },
];
