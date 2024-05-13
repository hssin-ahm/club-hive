import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-ngx-datatable',
  templateUrl: './request-users.component.html',
  styleUrls: ['./request-users.component.scss']
})
export class RequestUsersComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private jwtService: JwtService) {
    this.fetch('MEMBRE', 'PENDING', (data: any) => {
      this.rows = data;
      this.loadingIndicator = false;
    });
  }

  ngOnInit(): void {
  }

  fetch(role: string, etat: string, cb: any) {
    this.jwtService.getUsersByRoleAndEtat(role, etat).subscribe(
      (response) => {
        cb(response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  acceptUser(id: number): void {
    this.jwtService.setUserAccepted(id).subscribe(
      response => {
        this.successMessage = 'User accepted successfully: ' + response;
        this.errorMessage = null;
        this.fetch('MEMBRE', 'PENDING', (data: any) => {
          this.rows = data;
        });
      },
      error => {
        this.errorMessage = 'Error accepting user: ' + error.error;
        this.successMessage = null;
      }
    );
  }


  rejectUser(id: number): void {
    this.jwtService.setUserRejected(id).subscribe(
      response => {
        this.successMessage = 'User rejected successfully: ' + response;
        this.errorMessage = null;
        this.fetch('MEMBRE', 'PENDING', (data: any) => {
          this.rows = data;
        });
      },
      error => {
        this.errorMessage = 'Error rejecting user: ' + error.error;
        this.successMessage = null;
      }
    );
  }

  // Method to clear messages
  clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

}
