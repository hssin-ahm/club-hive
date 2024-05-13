import { Component, OnInit ,ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubService } from '../../../services/club.service'; // Keep this import
import { MembershipService } from 'src/app/services/membership.service';
import { Club } from 'src/app/models/club.model';
import { UserService } from 'src/app/services/user.service';
//import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.css']
})
export class ClubCreateComponent implements OnInit {
  validationForm1: FormGroup;
  validationForm2: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  clubForm!: FormGroup;
  clubCreated : boolean = false;
  club:Club;
  users: any[] = [];
  messageState: string = 'hidden';
  assignMessageState: string = 'hidden';

  constructor(private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
     private clubService: ClubService,private membershipservice:MembershipService,
     private userService:UserService,
     private router:Router) { }
  selectedFile: File;

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  ngOnInit(): void {


  /**
     * form1 value validation
     */
  this.validationForm1 = this.formBuilder.group({
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    userName : ['', Validators.required]
  });

  /**
   * formw value validation
   */
  this.validationForm2 = this.formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    mobileNumber : ['', Validators.required],
    password : ['', Validators.required]
  });

  this.isForm1Submitted = false;
  this.isForm2Submitted = false;



    this.clubForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      contactInfo: ['', Validators.required]
    });
    this.getUsers();

    this.isForm1Submitted = false;
  }
  getUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error retrieving users', error);
      }
    );
  }
  swal(){
    Swal.fire({
      position: 'top-end',
      title: 'Your work has been saved',
      text: '',
      showConfirmButton: false,
      timer: 1500,
      icon: 'success'
    });
  }
  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.clubForm.get('name').value);
    formData.append('description', this.clubForm.get('description').value);
    formData.append('contactInfo', this.clubForm.get('contactInfo').value);
    formData.append('logo', this.selectedFile);
  
    this.clubService.createClub(formData).subscribe(
      (response) => {
        this.messageState = 'visible';
        setTimeout(() => this.messageState = 'hidden', 3000);
        this.club = response;

        console.log('Club created successfully');
        this.clubCreated = true;
        this.swal();
        this.wizardForm.goToNextStep();
      },
      (error) => {
        console.error('Error creating club', error);
      }
    );
  }
  onSidebarThemeChange(event: Event) {
    //this.document.classList.remove('sidebar-light', 'sidebar-dark');
    //this.document.classList.add((<HTMLInputElement>event.target).value);
    const elements = this.document.querySelectorAll('.settings-open');
elements.forEach((element) => {
  element.classList.remove('sidebar-light', 'sidebar-dark');
  element.classList.add((<HTMLInputElement>event.target).value);
  element.classList.remove('settings-open');
});
  }
  assignPresident( userId: number): void {
    let usertoupdate:any;
    this.userService.getUserById(userId).subscribe(
      (user) => {
        usertoupdate = user;
        usertoupdate.role = 'RESPONSABLE';
        this.userService.updateUser(userId, usertoupdate).subscribe(
          () => {
           // alert(userId + ' ' + this.club.id);
            let membership = {
              club: { id: this.club.id },
              user: { id: userId },
              president: true
            };
        
            this.membershipservice.addMember(membership).subscribe(
              () => {
        
               
                
                console.log('User assigned as president');
              },
              (error) => {
                console.error('Error assigning president', error);
              }
            );
            this.users = this.users.filter(user => user.id == userId);
            this.swal();
            this.wizardForm.goToNextStep();
            console.log('User role updated');
          },
          (error) => {
            console.error('Error updating user role', error);
          }
        );
        console.log('User to assign as president', user);
      },
      (error) => {
        console.error('Error retrieving user', error);
      }
    );
  
  }
  
/**
   * Wizard finish function
   */
finishFunction() {
  alert('Successfully Completed');
}

/**
 * Returns form
 */
get form1() {
  return this.validationForm1.controls;
}

/**
 * Returns form
 */
get form2() {
  return this.validationForm2.controls;
}

/**
 * Go to next step while form value is valid
 */
form1Submit() {
  if(this.validationForm1.valid) {
    this.wizardForm.goToNextStep();
  }
  this.isForm1Submitted = true;
}

/**
 * Go to next step while form value is valid
 */
form2Submit() {
  if(this.validationForm2.valid) {
    this.wizardForm.goToNextStep();
  }
  this.isForm2Submitted = true;
}


}
  /*animations: [
    trigger('messageState', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('500ms ease-in')),
      transition('visible => hidden', animate('500ms ease-out'))
    ])
  ]*/