import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: string | undefined;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  forgotPassword() {
    const email = prompt('Please enter your email:');
    if (email) {
      this.service.forgotPassword(email).subscribe(
        response => alert('A reset password email has been sent to your email address.'),
        error => alert('An error occurred while trying to send the reset password email.')
      );
    }
  }

  submitForm() {
    this.service.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        const jwtToken = response.jwt;
        if (jwtToken) {
          localStorage.setItem('jwt', jwtToken);
          this.router.navigateByUrl("/dashboard");
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.loginError = error.message || 'An unexpected error occurred';
      }
    });
  }
  
  

}
