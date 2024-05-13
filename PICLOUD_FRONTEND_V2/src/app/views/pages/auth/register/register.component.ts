import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  selectedFile: File = null;
  successMessage: string;
  submitted = false;

  constructor(
    private jwtService: JwtService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      profileImage: [null, [Validators.required]]  // Although Validators.required won't work directly, it's set for consistency.
    }, { validator: this.passwordMathValidator });
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.registerForm.get('profileImage').setValue(this.selectedFile);
    } else {
      this.registerForm.get('profileImage').setValue(null);
    }
  }

  submitForm() {
    this.submitted = true;  // Set the flag to true on form submission
  
    if (this.registerForm.invalid) {
      if (!this.selectedFile) {
        this.registerForm.get('profileImage').setErrors({ required: true });
      }
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.registerForm.get('name').value);
    formData.append('email', this.registerForm.get('email').value);
    formData.append('password', this.registerForm.get('password').value);
    formData.append('profileImage', this.selectedFile);
  
    this.jwtService.register(formData).subscribe(
      response => {
        this.successMessage = "Hello " + response.name + ", you have registered successfully. Please verify your email before login.";
      },
      error => {
        console.error('Error during registration:', error);
        if (error.error === 'Email already exists') {
          this.registerForm.get('email').setErrors({ emailTaken: true });
        }
      }
    );
  }
  

  passwordMathValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }
}
