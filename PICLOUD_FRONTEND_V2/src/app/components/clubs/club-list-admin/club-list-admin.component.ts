import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from '../../../models/club.model';
import { ClubService } from '../../../services/club.service';
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms', style({ opacity: 0 })),
  ]),
]);
@Component({
  selector: 'app-club-list-admin',
  templateUrl: './club-list-admin.component.html',
  styleUrls: ['./club-list-admin.component.scss'],
  animations: [fadeAnimation]
})
export class ClubListAdminComponent implements OnInit {
ref() {
  this.getClubs()
}
  club: Club;

  constructor(private clubService: ClubService, private router: Router) { }

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getClubById(localStorage.getItem('idClub') as unknown as number)
    .subscribe((clubs) =>{ this.club = clubs;
      console.log(this.club);}
    );
    /*this.clubService.getClubs()
      .subscribe((clubs) =>{ this.clubs = clubs;
        console.log(this.clubs);}
      );
      */
  }

  goToClubDetails(id: number): void {
    this.router.navigate(['/club/get', id]);
  }

  editClub(id: number): void {
    this.router.navigate(['/club/edit', id]);
  }

  /*deleteClub(id: number): void {
    if (confirm('Are you sure you want to delete this club?')) {
      this.clubService.deleteClub(id)
        .subscribe(() => {
          // Remove the deleted club from the list
          this.clubs = this.clubs.filter(club => club.id !== id);
        });
    }
  }*/
  goToCreateClub(): void {
    this.router.navigate(['/club/create']);
  }
}
