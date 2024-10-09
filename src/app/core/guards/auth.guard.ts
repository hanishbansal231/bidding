import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated(); // Check if the user is authenticated

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirect to home page if authenticated
      return false; // Prevent access to the requested route
    } else {
      return true; // Allow access to login and register pages
    }
  }
}
