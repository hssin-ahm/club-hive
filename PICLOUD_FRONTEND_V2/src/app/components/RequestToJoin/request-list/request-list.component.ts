import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestToJoinService } from "src/app/services/request-to-join-service.service";  
import { RequestToJoin, Status } from "src/app/models/RequestToJoin.model";
import { MembershipService } from 'src/app/services/membership.service';
import { JwtService } from 'src/app/services/jwt.service';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  Status = Status;
  requests: RequestToJoin[] = [];
  clubId: number ;
  request1 : any;

  constructor(
    private jwtService : JwtService,
    private requestToJoinService: RequestToJoinService,
    private route: ActivatedRoute,
    private membershipService: MembershipService
  ) { }

  ngOnInit(): void {
    const id =+ localStorage.getItem('idClub');
    this.clubId = id;
    console.log(this.clubId);
    
      this.requestToJoinService.getRequestsToJoinByClubId(this.clubId).subscribe(
        requests => {this.requests = requests;
          console.log("iwant this log"+ this.requests);
        },
        error => console.log('Error fetching requests: ', error)
      );
    
  }
  getStatusString(status: Status): string {
    return Status[status];
  }
  rejectRequest(request: RequestToJoin) {
    request.status = Status.REJECTED;
    this.requestToJoinService.updateRequestToJoin(request).subscribe(
      updatedRequest => {
        console.log('Request updated successfully');
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
    }
  acceptRequest(request: RequestToJoin) {
    console.log(request);
    //console.log("token admin"+this.jwtService.test())
    request.status = Status.APPROVED;
    console.log("test"+request.status)
    console.log("test2"+request.id)
     this.request1=request;
    this.requestToJoinService.updateRequestToJoin(request).subscribe(
      updatedRequest => {
        let membership = {
          club: { id: this.clubId },
          user: { id: this.request1.userid }
        };

  console.log(membership);
        this.membershipService.addMember(membership).subscribe(
          newMembership => {
            
            console.log('Membership added successfully');
          },
          error => {
            // An error occurred while adding the membership
            console.error('An error occurred:', error);
          }
        );
      },
      error => {
      
        console.error('An error occurred:', error);
      }
    );
  }

}