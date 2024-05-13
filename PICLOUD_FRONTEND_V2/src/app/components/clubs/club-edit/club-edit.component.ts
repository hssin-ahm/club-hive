import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from '../../../models/club.model';
import { ClubService } from '../../../services/club.service';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css']
})
export class ClubEditComponent implements OnInit {
  clubForm: FormGroup;
  club: Club | null = null;
  clubId!: number;
  updateMessage: string = ''; 

  constructor(
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clubForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      contactInfo: ['', Validators.required],
      logo: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubId = +localStorage.getItem('idClub') as unknown as number;
      this.getClubDetails();
    });
  }

  getClubDetails(): void {
    this.clubService.getClubById(this.clubId)
      .subscribe(club => {
        this.club = club;
        this.populateForm();
      });
  }

  populateForm(): void {
    if (this.club) {
      this.clubForm.patchValue({
        name: this.club.name,
        description: this.club.description,
        contactInfo: this.club.contactInfo,
        logo: this.club.logo
      });
    }
  }

  onSubmit(): void {
    if (this.clubForm.invalid) {
      return;
    }

    const formData = this.clubForm.value;
    this.clubService.updateClub(this.clubId, formData).subscribe(
      response => {
        console.log('Club updated successfully:', response);
        this.updateMessage = 'Club updated successfully!'; 
        setTimeout(() => {
          this.updateMessage = ''; 
        }, 3000);
      },
      error => {
        console.error('Error updating club:', error);
      }
    );
  }
}
