import { Component, OnInit, TemplateRef } from '@angular/core';
import { Department } from '../../../models/department.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Club } from '../../../models/club.model';
import { ClubService } from '../../../services/club.service';
import { DepartmentService } from '../../../services/department.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DepartmentCreateComponent} from '../department-create/department-create.component';
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  clubs: Club[] = [];
  id: number = 0;
  
  constructor(private departmentService: DepartmentService, private router: Router,private route: ActivatedRoute,private modalService: NgbModal) { }


  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }
  reloadPage() {
    location.reload();
  }
  ngOnInit(): void {
     let id =+ localStorage.getItem("idClub");
     this.id = id;
    this.getDepartmentsbyclub(id);
  }
  
  getDepartmentsbyclub(id: number): void  {
    this.departmentService.getDepartmentsbyclub(id)
      .subscribe(departments => {
        this.departments = departments;
      
          // department.club.id = id)
      
        });
  }
  
  goToDepartmentDetails(id: number): void {
    this.router.navigate(['apps/department/get', id]);
  }
  
  goToDepartmentUpdate(iddepartment : number): void {
    this.router.navigate(['apps/department/update', iddepartment,this.id]);
  }
  
  deleteDepartment(id: number): void {
    if (confirm("Are you sure you want to delete this department?")) {
      this.departmentService.deleteDepartment(id)
        .subscribe(() => {
          // Remove the deleted department from the list
          this.departments = this.departments.filter(department => department.id !== id);
        });
    }
  }
}
