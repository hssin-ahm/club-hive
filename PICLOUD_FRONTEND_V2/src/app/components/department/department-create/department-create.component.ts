import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/department.service';
import { Club } from '../../../models/club.model';
import { ClubService } from '../../../services/club.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Department } from '../../../models/department.model';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  departmentForm!: FormGroup;
  clubs: Club[] = [];
  members: User[] = [];
  selectedMember: User | null = null;
  selectedClubId: number | null = null;
  updateSuccessMessage: string = '';
  updateErrorMessage: string = '';
  constructor(
    private clubService: ClubService,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private userService: UserService,
    private router: Router,private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      //clubId: ['', Validators.required],
      memberId: [''] 
    });
    
    //let id1 = 1;
    //this.getClubByuser(id1);
    this.selectedClubId = localStorage.getItem('idClub') ? +localStorage.getItem('idClub') : null;
    this.userService.getUsersByClubId(this.selectedClubId).subscribe(members => this.members = members);
  }

  getClubByuser(id1: number): void {
    this.clubService.getClubByUserid(id1).subscribe(clubs => this.clubs = clubs);
  }

  /*onClubChange(): void {
    const selectedClubId = this.departmentForm.value.clubId;
    this.userService.getUsersByClubId(selectedClubId).subscribe(members => this.members = members);
  }*/

  onSubmit(): void {
    /*if (this.departmentForm.invalid) {
      return;
    }*/
    console.log('Department created successfully:', this.departmentForm.value);
    const formData = this.departmentForm.value;
    const departmentData = new Department(null, formData.name, this.selectedClubId);
    const memberId = formData.memberId;
  
    // Check if memberId is not null
   
    
    if (memberId) {
     
      this.departmentService.addDepartment(departmentData, this.selectedClubId, memberId).subscribe(
        response => {
          this.updateSuccessMessage = 'Department created successfully.';
          console.log('Department created successfully:', response);
        },
        error => {
          this.updateErrorMessage = 'Error created department.';
          console.error('Error creating department:', error);
        }
      );
    } else {
      console.error('Error: Member not selected.');
    }
  }
  
  
}
