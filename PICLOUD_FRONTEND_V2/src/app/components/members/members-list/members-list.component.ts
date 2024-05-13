
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Membership } from '../../../models/membership.model';
import { MembershipService } from '../../../services/membership.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { DataTable } from "simple-datatables";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-members-list',
 // standalone: true,
  //imports: [NgbPaginationModule],
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css'],
  
})
export class MembersListComponent  {
  page = 4;
  members: Membership[];
  users: User[];
  clubid: number;
  userId:number;
  constructor(private membershipService: MembershipService,
    private userService:UserService,
     private route: ActivatedRoute,
     private router: Router) { 
      
     }
     ngAfterViewInit() {
      //const dataTable = new DataTable("#dataTableExample");
    }
  ngOnInit() {
    
    this.userId=localStorage.getItem('idUser') as unknown as number;
    const id =localStorage.getItem('idClub') as unknown as number;
    this.clubid = id;
    this.userService.getUsersByClubId(id).subscribe(
      (users) => {
        this.users = users;
        
        //alert(this.userId);
        let filteredUsers = [];
for (let user of this.users) {
  console.log(user.id+"*********"+this.userId)
  if (user.id != this.userId) {
    filteredUsers.push(user);
  }
}
this.users = filteredUsers;

      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  deleteMember(id: number): void {
    // Call your service to delete the member
    this.membershipService.deleteMemberByUserId_ClubId(id,this.clubid).subscribe(
      () => {
        // Remove the member from the members array
        this.users = this.users.filter(user => user.id !== id);
      },
      error => {
        console.error('Error deleting member', error);
      }
    );
  }
  redirectToCreateBehaviorScore(userId: number) {
    this.router.navigate(['/apps/behavior-score/list', userId, this.clubid]);
  }
}
