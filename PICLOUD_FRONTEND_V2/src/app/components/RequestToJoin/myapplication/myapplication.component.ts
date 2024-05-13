import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestToJoin, Status } from 'src/app/models/RequestToJoin.model';
import { JwtService } from 'src/app/services/jwt.service';
import { MembershipService } from 'src/app/services/membership.service';
import { RequestToJoinService } from 'src/app/services/request-to-join-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-myapplication',
  templateUrl: './myapplication.component.html',
  styleUrls: ['./myapplication.component.css']
})
export class MyapplicationComponent implements OnInit {
  basicExampleOptions: OwlOptions = {
    loop:true,
    margin:10,
    nav:false,
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
  Status = Status;
  requests: RequestToJoin[] = [];
  clubId: number ;
 

  constructor(
    private jwtService : JwtService,
    private requestToJoinService: RequestToJoinService,
    private route: ActivatedRoute,
    private membershipService: MembershipService
  ) { }
  ngOnInit(): void {
    const id =+ this.route.snapshot.paramMap.get('id')!;
    this.clubId = Number(localStorage.getItem('clubId')) ;
    console.log(this.clubId);
    console.log()
      this.requestToJoinService.getRequestsToJoinByUserId(Number(localStorage.getItem('idUser')) ).subscribe(
        requests => {this.requests = requests;
          console.log("iwant this log"+ this.requests);
          console.log(this.requests[0].clubName);
        },
        error => console.log('Error fetching requests: ', error)
      );
    
  }
}
