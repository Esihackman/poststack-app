import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public router: Router, public authService: AuthService) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  toggleAuth(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      const email = prompt('Email:') ?? '';
      const password = prompt('Password:') ?? '';
      const success = this.authService.login(email, password);
      if (success) {
        this.router.navigate(['/posts']);
      } else {
        alert('Login failed. Try again.');
      }
    }
  }
}
