import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatPaginator } from '@angular/material/paginator';
//import { MatTableDataSource } from '@angular/material/table';
import { Test } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from 'src/app/services/club.service';
import { Club } from 'src/app/models/club.model';
import{ZenquotesComponent} from '../zenquotes/zenquotes.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-availabletests',
  templateUrl: './availabletests.component.html',
  styleUrls: ['./availabletests.component.scss']
})
export class AvailabletestsComponent implements OnInit{
  //dataSource: MatTableDataSource<Test>; 
  clubId : any;
  club:Club;
  private sub: Subscription;
  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  gridview = true;
  listview = false;
  
  tests: Test[] = [];
  interval: any;

  constructor(private quizservice: QuizService,private route :ActivatedRoute,private clubService: ClubService) {
    //this.dataSource = new MatTableDataSource<Test>(this.tests); // Specify the data source type
  }
  
  ngOnInit(): void {
    this.sub = this.route.parent.paramMap.subscribe(params => {
      this.clubId = params.get('clubId');
      // Now you can use clubId
    });
   //this.clubId=this.router.snapshot.paramMap.get('id');
   console.log(this.clubId);
  
    /*this.getTests(); // Initial call to fetch tests
    this.interval = setInterval(() => {
      this.getTests(); // Fetch tests at fixed intervals
    }, 5000);*/
    this.getTests();
    
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    clearInterval(this.interval); // Clear interval on component destruction
  }

  getTests(): void {
    this.clubService.getClubById(this.clubId).subscribe(club => {
      console.log("clubssss"+club);
      this.club = club;
      this.tests = this.club.tests;
     console.log('Tests:', this.tests);
    } );
      
   
    /*
    this.quizservice.getTests().subscribe(
      (response: Test[]) => {
        this.tests = response;
        console.log('Tests:', this.tests);
        this.dataSource.data = this.tests; // Update the data source with fetched tests
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching tests:', error);
      }
    );
  */}

  getActiveTests(): Test[] {
    return this.tests.filter(test => test.active);
  }

  toListView(): void {
    this.gridview = false;
    this.listview = true;
  }

  toGridView(): void {
    this.gridview = true;
    this.listview = false;
  }
}
