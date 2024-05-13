import { Component, OnInit, AfterViewInit,TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from '../../../models/club.model';
import { ClubService } from '../../../services/club.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ClubEditComponent} from '../club-edit/club-edit.component';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit {
  club: Club | null = null;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    let id = +localStorage.getItem('idClub') as unknown as number;

    this.getClubDetails(id);
  }
  reloadPage() {
    location.reload();
  }
  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }
  editClub(id: number): void {
    this.router.navigate(['/club/edit', id]);
  }

  getClubDetails(id: number): void {
    this.clubService.getClubById(id)
      .subscribe(club => this.club = club);
  }

  goToDepartments(id: number): void {
    this.router.navigate(['/departments', id]);
  }
}
