import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../services/department.service';
import { UserService } from '../../../services/user.service';
import { Department } from '../../../models/department.model';
import { User } from '../../../models/user.model';
import { MembershipService } from '../../../services/membership.service';
@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.css']
})
export class DepartmentUpdateComponent implements OnInit {
  department!: Department ;
  users: User[] = [];
  selectedUsers: User[] = [];
  selectedMembers: User[] = [];
  isUpdating: boolean = false;
  updateSuccessMessage: string = '';
  updateErrorMessage: string = '';
   clubid : number ;

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private userService: UserService,
    private membershipService : MembershipService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const departmentId = +params['iddepartment'];
      this.clubid = +params['idclub'];
      this.loadDepartment(departmentId);
      this.loadUsersByClub();
    });
     
  }

  loadDepartment(departmentId: number | null): void {
    if (departmentId )
    this.departmentService.getDepartmentById(departmentId).subscribe(
      department => {
        this.department = department;
      },
      error => {
        console.error('Error fetching department:', error);
      }
    );
  }

  loadUsersByClub(): void {
    
    this.userService.getMembersWithoutDepartment(this.clubid).subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error fetching users by club ID:', error);
      }
    );
  }

  updateDepartment(): void {
    if (this.department) {
      this.isUpdating = true;
      this.departmentService.updateDepartment(this.department).subscribe(
        updatedDepartment => {
          this.isUpdating = false;
          this.updateSuccessMessage = 'Department updated successfully.';
          setTimeout(() => {
            this.updateSuccessMessage = '';
          }, 3000);
          // Assign users to department after department update
          this.assignUsersToDepartment();
        },
        error => {
          this.isUpdating = false;
          this.updateErrorMessage = 'Error updating department.';
          setTimeout(() => {
            this.updateErrorMessage = '';
          }, 3000);
          console.error('Error updating department:', error);
        }
      );
    }
  }

  addSelectedMember(): void {
    if (this.selectedUsers.length > 0) {
      this.selectedMembers.push(...this.selectedUsers);
      this.users = this.users.filter(user => !this.selectedUsers.includes(user));
      this.selectedUsers = [];
    }
  }

  cancelSelection(member: User): void {
    this.selectedMembers = this.selectedMembers.filter(user => user !== member);
    this.users.push(member);
  }

  assignUsersToDepartment(): void {
    if (this.selectedMembers.length > 0 && this.department) {
      const userIds = this.selectedMembers.map(user => user.id).filter(id => id !== null) as number[];
      const clubId = this.clubid; // Provide a default value if clubId is undefined
      this.membershipService.assignUsersToDepartment(userIds, this.department.id, clubId).subscribe(
        () => {
          console.log('Users assigned to department successfully.');
          this.loadDepartment(this.department.id);
          this.loadUsersByClub();
        },
        error => {
          console.error('Error assigning users to department:', error);
        }
      );
    }
  }
  
  
}
