import { Component, OnInit } from '@angular/core';
import { BehaviorScore } from '../../../models/BehaviorScore.model';
import { BehaviorScoreService } from 'src/app/services/behavior-score-service.service';
import { MembershipService } from 'src/app/services/membership.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
@Component({
  selector: 'app-behavior-score-list',
  templateUrl: './behaviorscore-list.component.html',
  styleUrls: ['./behaviorscore-list.component.css']
})
export class BehaviorScoreListComponent implements OnInit {
  behaviorScores: BehaviorScore[] = [];
  totalScore: number;
  membership: any;
  userId: number = 0;
  clubId: number = 0;
  constructor(private behaviorScoreService: BehaviorScoreService,
    private route: ActivatedRoute,
    private membershipService: MembershipService,
     private router : Router
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.clubId = this.route.snapshot.params['clubId'];
    this.membershipService.getMembershipByUserAndClub(this.userId, this.clubId).subscribe(
      membership => {
        this.membership = membership;
        this.behaviorScoreService.getBehaviorScoresByMembership(this.membership.id).subscribe(
          behaviorScores => {
            this.behaviorScores = behaviorScores;
            this.totalScore = this.calculateTotalScore(behaviorScores);
            console.log(this.behaviorScores);
          },
          error => console.log('Error fetching behavior scores: ', error)
        );
      },
      error => console.log('Error fetching membership: ', error)
    );
  }
  goToCreateBehavior(){
      this.router.navigate(['apps/behavior-score/create', this.userId, this.clubId]);
  }
  calculateTotalScore(behaviorScores: BehaviorScore[]): number {
    return behaviorScores.reduce((total, behaviorScore) => total + behaviorScore.score, 0);
  }
deleteBehaviorScore(id: number): void {
    if (confirm('Are you sure you want to delete this behavior score?')) {
      this.behaviorScoreService.deleteBehaviorScore(id)
        .subscribe(() => {
          // Remove the deleted behavior score from the list
          this.behaviorScores = this.behaviorScores.filter(behaviorScore => behaviorScore.id !== id);
          this.totalScore = this.calculateTotalScore(this.behaviorScores);
        });
    }
  }
  /*loadBehaviorScores(id:number): void {
    this.behaviorScoreService.getBehaviorScoresByMembership(id).subscribe(
      behaviorScores => {
        console.log(behaviorScores);
        this.behaviorScores = behaviorScores},
      error => console.log('Error fetching behavior scores: ', error)
    );
  }*/
}
