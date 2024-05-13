import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  // Add a property for the user data
  userData: any = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private service: JwtService) { } // inject the service

  ngOnInit(): void {
  }

  // Method to handle form submission
  onSubmit(): void {
    const userId = 1; // replace with the actual user ID
    this.service.updateUserProfile(userId, this.userData).subscribe(
      response => {
        console.log('Profile updated successfully', response);
        // handle successful update
      },
      error => {
        console.error('Error updating profile', error);
        // handle error
      }
    );
  }
}
