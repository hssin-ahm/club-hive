import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { UserService } from '../../../services/user.service';
import { DepartmentService } from '../../../services/department.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  users: User[] = [];
  responsable: User | null = null;
  departmentId!: number; // Declare departmentId property
  clubId :number;
  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.departmentId = +params['id']; // Get departmentId from route parameter
      this.loadUsers();
    });
    this.clubId=localStorage.getItem('idClub') as unknown as number;
  }
  deleteuser(arg0: number) {
    console.log("user" + arg0 + "clubid" + this.clubId);
    this.userService.deleteUserFromDepartment(arg0, this.clubId).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== arg0);
        this.loadUsers();
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
    }
  loadUsers(): void {
    this.userService.getUsersByDepartmentId(this.departmentId).subscribe(
      users => {
        this.users = users;
        console.log('Users:', users);
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
    this.departmentService.getResponsableId(this.departmentId).subscribe(
      user => {this.responsable=user;},
      error => { console.error('Error fetching users:', error);}
      
    )
  }
}
