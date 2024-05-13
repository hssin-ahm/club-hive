import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/club.model';
import { ClubService } from 'src/app/services/club.service';
//import { MatPaginator } from '@angular/material/paginator';
//import { MatTableDataSource } from '@angular/material/table';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-listclubtojoin',
  templateUrl: './listclubtojoin.component.html',
  styleUrls: ['./listclubtojoin.component.css']
})
export class ListclubtojoinComponent {
  autoPlayExampleOptions: OwlOptions = {
    items:4,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive:{
      0:{
          items:2
      },
      600:{
          items:3
      },
      1000:{
          items:4
      }
    }
  }
  clubs: Club[] = [];
  Myclubs: Club[] = [];
  finalclubs:Club[]=[];
  userId:number;
  //dataSource: MatTableDataSource<any>; 
  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private clubService: ClubService, private router: Router) {

   }
  ngOnInit(): void {
   // this.dataSource = new MatTableDataSource<any>(this.finalclubs);
    this.userId=localStorage.getItem('idUser') as unknown as number;
      //alert(this.userId);
      this.clubService.getClubs()
      .subscribe(clubs => {
        this.clubs = clubs;
        this.clubService.getClubByUserid(this.userId).subscribe(
          (clubs2) =>{ this.Myclubs = clubs2;
            console.log(this.Myclubs);
            this.finalclubs = this.clubs.filter(club => !this.Myclubs.some(myClub => myClub.id === club.id));
            //this.dataSource = new MatTableDataSource(this.finalclubs);
            //setTimeout(() => this.dataSource.paginator = this.paginator);
          }
        );
        console.log('Clubs:', clubs); 
      });
      //this.clubFiltrated();
  }
  clubFiltrated(): void {
    this.getClubs();
    this.Myclub();
console.log("Myclubs" + this.Myclubs);
console.log("club" + this.clubs);
    this.clubs = this.clubs.filter(club => !this.Myclubs.some(myClub => myClub.id === club.id));
  }
  Myclub(){
    this.clubService.getClubByUserid(this.userId).subscribe(
      (clubs) =>{ this.Myclubs = clubs;
        console.log(this.Myclubs);}
    );
  }
  getClubs(): void {
    this.clubService.getClubs()
      .subscribe(clubs => {
        this.clubs = clubs;
        console.log('Clubs:', clubs); 
      });
  }
  goToAvailableTest(clubId:number): void {
    this.router.navigate(['/apps/testfront', clubId, 'availabletest']);
  }
  /**code pen */
  
}
