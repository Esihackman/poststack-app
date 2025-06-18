import { Routes } from '@angular/router';
import { PostListComponent } from '../app/components/post-list/post-list.component';
import { PostDetailComponent } from '../app/components/post-detail/post-detail.component';
import { PostEditComponent } from '../app/components/post-edit/post-edit.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { AuthGuard } from './services/auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'posts/:id/edit', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  // ...add login route here if needed
];