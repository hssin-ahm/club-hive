import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { JwtService } from 'src/app/services/jwt.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  thisUserEmail: string;
  thisUser: any; // Ensure thisUser can handle the role and etat
  showRequestResponsable: boolean = false; // Control visibility of the link

  searchControl = new FormControl();

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private service: JwtService
  ) { }

  ngOnInit(): void {
    const email = this.service.getEmailFromToken();
    if (email) {
      this.service.getUserByEmail(email).subscribe(data => {
        this.thisUser = data;
        console.log('User details retrieved:', this.thisUser);
        // Check user role and etat
        this.showRequestResponsable = this.thisUser.role === 'MEMBRE' && this.thisUser.etat === 'NORMAL';
      }, error => {
        console.error('Failed to fetch user details:', error);
      });
    }
  }

  switchUser(event: Event) {
    event.preventDefault();
    if (this.thisUser && this.thisUser.id) {
      this.service.setUserPending(this.thisUser.id).subscribe({
        next: (response) => {
          alert('The request for responsible is sent successfully.');
        },
        error: (error) => {
          console.error('Failed to switch user state:', error);
          alert('Failed to send the request.');
        }
      });
    } else {
      alert('No user ID found or user data is incomplete.');
    }
  }

  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  logout() {
    this.service.logout();
  }
}
