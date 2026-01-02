import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginForm: FormGroup;
  submitted = false;
  error = false;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder){
      
      this.loginForm = this.fb.group({
        email : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required, Validators.minLength(6)]]
      })
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.saveAuth(res.token, res.role);

        this.router.navigate(['/products']);
      },
      error: (err) =>{
        this.error = true;
      }
    });
  }
}