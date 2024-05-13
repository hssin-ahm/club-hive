
import { Component, OnInit, Renderer2,TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Club } from 'src/app/models/club.model';
import { Test } from 'src/app/models/quiz';
import { ClubService } from 'src/app/services/club.service';

import { QuizService } from 'src/app/services/quiz.service';
//import { ImportquizComponent } from './importquiz/importquiz.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  
})
export class TestComponent implements OnInit{
  defaultNavActiveId = 1;
  quizsbyapi: any[] = [];
  club:Club;
  idUser: any;
  idClub:number;
  public tests!:Test[];
  constructor(private quizservice:QuizService,private renderer: Renderer2,
    private modalService: NgbModal,
    private clubService:ClubService,
    private router: ActivatedRoute
  ) { }
  ngOnInit(): void {
 this.idClub=Number(localStorage.getItem('idClub')) ;
 
 //console.log("idClub"+this.idClub);
    /*let email = this.jwtService.getemail();
    this.userService.getUserbyemail(email).subscribe(
      (res) => {
        console.log(res.id);
        this.clubService.getClubByUserAndPresident(res.id).pipe(
          catchError(error => {
            console.error("Error occurred: ", error);
            return throwError(error);
          })
        ).subscribe(
          (response) => {
            this.club = response;
            this.tests=this.club.tests;
            console.log("Club: ", this.club);
          }
        );
    
        // localStorage.setItem('idUser', res.id.toString()); 
        this.idUser = res.id;
        console.log("After I get the user: " + this.idUser);
      },
      error => {
        console.error("Error occurred: ", error);
      }
    );*/
    this.getalltests();
  }
  getalltests(): void {
    this.clubService.getClubById(this.idClub/*this.club.id*/).subscribe(club => {
      console.log("clubssss"+club);
      this.club = club;
      console.log(this.tests);
      this.tests = this.club.tests;
      
     console.log('Tests:', this.tests);
    } );
   
  }


 
  /*public getalltests(): void{
    this.quizservice.getTests().subscribe(
      (response:Test[])=>{
        this.tests=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }*/

  active(id:number){
    this.quizservice.activateanactivate(id).subscribe(() => {
      // just refresh
      console.log("refresh");
      this.getalltests();
    });
  }


  deleteId: number | null = null;

  reloadPage() {
    location.reload();
  }
  openxlModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }
  openLgModal1(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }
  openDeleteModal(id: number) {
    this.deleteId = id;
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.renderer.addClass(modalElement, 'show'); // Add the 'show' class to display the modal
      this.renderer.setStyle(modalElement, 'display', 'block'); // Set the display style to 'block'
    }
  }
  
  confirmDelete() {
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.renderer.removeClass(modalElement, 'show'); // Remove the 'show' class to hide the modal
      this.renderer.setStyle(modalElement, 'display', 'none'); // Set the display style to 'none'
    }
    
    if (this.deleteId !== null) {
      this.delete(this.deleteId);
      this.deleteId = null;
    }
  }
  
  
  delete(id:number){
    this.quizservice.deletetest(id).subscribe(() => {
      // just refresh
      this.getalltests();
    });
  }

}
