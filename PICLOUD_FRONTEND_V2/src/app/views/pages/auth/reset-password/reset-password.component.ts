import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  isFormVisible: boolean = true; // default to true

  constructor(
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const storedEmail = localStorage.getItem('resetEmail');
      if (email) {
        // Check if the current email has been used to reset the password
        this.isFormVisible = storedEmail !== email;
      } else {
        // If no email is provided, hide the form and consider cleaning up local storage
        this.isFormVisible = false;
        this.errorMessage = 'No valid email address provided.';
        localStorage.removeItem('resetEmail'); // Consider clearing storage if the condition meets
      }
    });
  }

  resetPassword() {
    const newPassword = this.resetPasswordForm.get('password').value;
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.jwtService.setPassword(email, newPassword).subscribe(
        response => {
          this.successMessage = 'Your password has been reset successfully. You can go back and login.';
          this.isFormVisible = false; // Hide the form after successful reset
          localStorage.setItem('resetEmail', email); // Save the email used for reset in local storage
        },
        error => {
          this.errorMessage = 'An error occurred while trying to reset your password.';
        }
      );
    } else {
      this.errorMessage = 'No valid email address provided.';
    }
  }
}
