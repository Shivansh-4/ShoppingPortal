import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;
  submitted = false;
  error = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router){
      this.signupForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
        email : ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
  }

  get f(){
    return this.signupForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.signupForm.invalid){
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next:(res) => {
        this.error = false;
        alert('Registration Successful');

        this.router.navigate(['/login']);
      }, error: (err) =>{
        this.error = true;
        this.errorMessage = err.error?.message || 'Please try again';
      }
    });
  }
}
