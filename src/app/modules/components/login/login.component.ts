import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginCredentials = this.loginForm.value;
    
    this.authService.loginUser(loginCredentials).subscribe({
      next: (user:any) => {
        if (user) {
          // Redirect to dashboard or home page after successful login
          this.router.navigate(['']); // Adjust this to your routes
        } else {
          this.loginError = 'Invalid email or password';
        }
      },
      error: (err:any) => {
        console.error('Login error:', err);
        this.loginError = 'An error occurred. Please try again later.';
      }
    });
  }
}
