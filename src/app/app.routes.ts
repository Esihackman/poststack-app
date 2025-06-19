import { Routes } from '@angular/router';
import { PostListComponent } from '../app/components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from '../app/components/post-edit/post-edit.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: PostDetailComponent }, // ✅ This is for viewing
  { path: 'posts/:id/edit', component: PostEditComponent, canActivate: [AuthGuard] }, // ✅ This is for editing
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
];
  // ...add login route here if needed
