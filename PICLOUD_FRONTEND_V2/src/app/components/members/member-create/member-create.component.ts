import { Component , OnInit} from '@angular/core';
import { MembershipService } from '../../../services/membership.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Club } from 'src/app/models/club.model';
import { Membership } from 'src/app/models/membership.model';
@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  users: User[];
  clubid: number = 1;
  isSuccess: boolean;
  responseMessage: string;
  constructor(private userService: UserService, private membershipService: MembershipService,private route:ActivatedRoute) { }


  ngOnInit() {
    this.clubid=localStorage.getItem('idClub') as unknown as number;
    this.userService.findUsersNotInClub(this.clubid).subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
   
  }

  addToClub(userId: number): void {
    let membership = {
      club: { id: this.clubid },
      user: { id: userId }
    };

    this.membershipService.addMember(membership).subscribe(
      () => {
        this.responseMessage = 'User added to club';
        this.isSuccess = true;
        this.users = this.users.filter(user => user.id !== userId);
      },
      (error) => {
        this.responseMessage = 'Error adding user to club';
        this.isSuccess = false;
        console.error('Error adding user to club', error);
      }
    );
  }
}
