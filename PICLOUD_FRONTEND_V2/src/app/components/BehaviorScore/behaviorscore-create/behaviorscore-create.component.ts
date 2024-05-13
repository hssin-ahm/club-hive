import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorType } from 'src/app/models/BehaviorScore.model'
import { BehaviorScore } from 'src/app/models/BehaviorScore.model';
import { BehaviorScoreService } from 'src/app/services/behavior-score-service.service';
import { MembershipService } from 'src/app/services/membership.service';
import { ActivatedRoute } from '@angular/router';
import { Router,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-behaviorscore-create',
  templateUrl: './behaviorscore-create.component.html',
  styleUrls: ['./behaviorscore-create.component.css']
})
export class BehaviorscoreCreateComponent implements OnInit {
  previousUrl: string;
  behaviorScoreForm: FormGroup;
  behaviorTypes = Object.keys(BehaviorType);
  clubId: number = 0;
  userId: number = 0;
  membership: any;
  message: string;
  messageType: 'success' | 'error';
  constructor(private formBuilder: FormBuilder,
    private behaviorScoreService: BehaviorScoreService,
    private membershipService: MembershipService,
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.clubId = this.route.snapshot.params['clubId'];
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = event.url;
    });
    this.behaviorScoreForm = this.formBuilder.group({
      behaviorType: ['', Validators.required],
      score: ['', Validators.required],
      dateRecorded: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.membershipService.getMembershipByUserAndClub(this.userId, this.clubId).subscribe(
      membership => {console.log('Membership fetched: ', membership);
        this.membership = membership;
      },
      error => console.log('Error fetching membership: ', error)
    );
  }
  swal(){
    Swal.fire({
      position: 'top-end',
      title: 'Behavior score added successfully!',
      text: '',
      showConfirmButton: false,
      timer: 2000,
      icon: 'success'
    });
  }
  onSubmit(): void {
    if (this.behaviorScoreForm.valid) {
      const newBehaviorScore: BehaviorScore = this.behaviorScoreForm.value;
      newBehaviorScore.membership = this.membership;
      this.behaviorScoreService.addBehaviorScore(newBehaviorScore).subscribe(
        behaviorScore => {
          this.swal();
          this.message = 'Behavior score added successfully!';
          /*setTimeout(() => {
            this.router.navigateByUrl(this.previousUrl);  // navigate to the previous page
          }, 3000);*/
        },
        error => {
          this.message = 'Error adding behavior score.';
          console.log('Error adding behavior score: ', error);
        }
      );
    }
  }
  
}