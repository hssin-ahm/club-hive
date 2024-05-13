import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/club.model';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-clublistadminsite',
  templateUrl: './clublistadminsite.component.html',
  styleUrls: ['./clublistadminsite.component.scss']
})
export class ClublistadminsiteComponent {
  ref() {
    this.getClubs()
  }
    clubs: Club[] = [];
  
    constructor(private clubService: ClubService, private router: Router) { }
  
    ngOnInit(): void {
      this.getClubs();
    }
  
    getClubs(): void {
      /*this.clubService.getClubByUserid(localStorage.getItem('idUser') as unknown as number)
      .subscribe((clubs) =>{ this.clubs = clubs;
        console.log(this.clubs);}
      );*/
      this.clubService.getClubs()
        .subscribe((clubs) =>{ this.clubs = clubs;
          console.log(this.clubs);}
        );
        
    }
  
  
  
    deleteClub(id: number): void {
      if (confirm('Are you sure you want to delete this club?')) {
        this.clubService.deleteClub(id)
          .subscribe(() => {
            // Remove the deleted club from the list
            this.clubs = this.clubs.filter(club => club.id !== id);
          });
      }
    }
    goToCreateClub(): void {
      this.router.navigate(['/club/create']);
    }
}
