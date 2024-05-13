import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Club } from '../../../models/club.model';
import { ClubService } from '../../../services/club.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MyapplicationComponent } from '../../RequestToJoin/myapplication/myapplication.component';
declare var $: any;


@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],

})

export class ClubListComponent implements OnInit {
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
  
  constructor(private clubService: ClubService, private router: Router) { }

  ngAfterViewInit() {
    setTimeout(() => {
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: {
            items: 0
          },
          600: {
            items: 0
          },
          1000: {
            items: 1
          }
        },
        navText: ["<", ">"],
        autoplay: true,
        autoplayTimeout: 4000
      });
    });
  }
  
  onSlideTo(index: number) {
    $('.owl-carousel').trigger('to.owl.carousel', [index, 300]);
  }
  ngOnInit(): void {
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getClubByUserid(localStorage.getItem('idUser') as unknown as number)
      .subscribe(clubs => {
        this.clubs = clubs;
        console.log('Clubs:', clubs); 
      });
  }
  

  goToClubDetails(id: number): void {
    this.router.navigate(['/club/get', id]);
  }

  editClub(id: number): void {
    this.router.navigate(['/club/edit', id]);
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
}
