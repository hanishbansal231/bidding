import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authSerivce: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required] // Role selection
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;

      this.authSerivce.registerUser(newUser).subscribe(response => {
        console.log('User registered:', response);
      }, error => {
        console.error('Registration error:', error);
      });
    }
  }
}
