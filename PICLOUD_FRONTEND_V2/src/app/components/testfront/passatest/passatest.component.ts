import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';

import { createClient, Photo } from 'pexels';
import { QuizService } from 'src/app/services/quiz.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Test, UserTest } from 'src/app/models/quiz';
import { JwtService } from 'src/app/services/jwt.service';
import { Club } from 'src/app/models/club.model';
import { ClubService } from 'src/app/services/club.service';
import { RequestToJoinService } from 'src/app/services/request-to-join-service.service';

@Component({
  selector: 'app-passatest',
  templateUrl: './passatest.component.html',
  styleUrls: ['./passatest.component.scss']
})
export class PassatestComponent implements OnInit {
  connecteduser!: User;
  clubId : any;
  club:Club;
  private sub: Subscription;
  constructor(private quizservice: QuizService, 
    private requestToJoinService: RequestToJoinService,
    private activateroute: ActivatedRoute, private serv: UserService,private jwtService:JwtService,private clubService: ClubService)  { }
  aa!: string;
  showWarning: boolean = false;
  isQuizStarted: boolean = false;
  currentQuestionNumber: number = 0;
  remainingTime: number = 15;
  timer = interval(1000);
  subscription: Subscription[] = [];
  correctAnswerCount: number = 0;
  isQuizEnded: boolean = false;
  id!: number;
  showWastedEffect: boolean = false;
  ngOnInit(): void {
    
      this.sub = this.activateroute.parent.paramMap.subscribe(params => {
        this.clubId = params.get('clubId');
        // Now you can use clubId
      });
      /*this.clubService.getClubById(this.clubId).subscribe(club => {
        console.log("clubssss"+club);
        this.club = club;
       
       
      } );*/
     console.log(this.clubId);
    this.id = this.activateroute.snapshot.params['id']
    this.gettestbyid();
    this.serv.getUserbyemail(this.jwtService.getemail()).subscribe(
      (user: User) => {
        this.connecteduser = user;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle error accordingly
      }
    );
    // Call searchImage method somewhere in your component

  }

  scorePercentage: number = 0;
  scoreMessage: string = '';
  usrtest!: UserTest;
  finish() {
    this.isQuizEnded = true;
    this.isQuizStarted = false;
    //
    
    // the results
    this.scorePercentage = (this.correctAnswerCount / this.test.questions.length) * 100;
//set the new test history
this.usrtest = new UserTest();
this.usrtest.score = this.scorePercentage;
this.usrtest.test = this.test;
this.usrtest.user = this.connecteduser;
    // Set score message based on percentage
    if (this.scorePercentage === 100) {
      this.scoreMessage = "Very Good! You are so good! Your application has already been completed!";
      let request={ "description": null, "status": "PENDING","club":{
        "id":this.clubId
    },
    "user":{"id":this.connecteduser.id}
    }
    this.requestToJoinService.createRequestToJoin(request).subscribe(
      (response: any) => { console.log(response); },
      (error: HttpErrorResponse) => { alert(error.message); }
    );
      this.quizservice.passAtest(this.usrtest).subscribe();
    } else if (this.scorePercentage >= 60 && this.scorePercentage < 100) {
       let request={ "description": null, "status": "PENDING","club":{
        "id":this.clubId
    },
    "user":{"id":this.connecteduser.id}
    }
    this.requestToJoinService.createRequestToJoin(request).subscribe(
      (response: any) => { console.log(response); },
      (error: HttpErrorResponse) => { alert(error.message); }
    );
      this.scoreMessage = "Congratulations! Your application has already been completed!";

      this.quizservice.passAtest(this.usrtest).subscribe();
    } else {
      this.scoreMessage = "Sorry, you failed.";
      setTimeout(() => {
        this.showWastedEffect = true;
      }, 1000);
      setTimeout(() => {
        this.showWastedEffect = false;
      }, 1000);
    }
  }

  selectoption(option: any) {
    if (option.iscorrect) {
      this.correctAnswerCount++;
    }
    option.isSelected = true;
  }
  isOptionSelectd(options: any) {
    const selectioncount = options.filter((m: any) => m.isSelected == true);
    if (selectioncount == 0) {
      return false;
    } else {
      return true;
    }
  }

  nextquestion() {
    if (this.currentQuestionNumber < this.test.questions.length - 1) {
      this.currentQuestionNumber++;
      this.remainingTime = 15;
      this.searchPhotos((this.test.questions)[this.currentQuestionNumber].image);
    } else {
      this.subscription.forEach(element => {
        element.unsubscribe();
      })
    }
  }


  startQuiz() {
    this.searchPhotos((this.test.questions)[this.currentQuestionNumber].image);
    this.showWarning = false;
    this.isQuizStarted = true;
    this.subscription.push(this.timer.subscribe(res => {
      if (this.remainingTime != 0) {
        this.remainingTime--;
      }
      if (this.remainingTime == 0) {
        this.nextquestion();
        this.remainingTime = 15;
      }
    })
    )
  }

  //get the test by id 
  public test!: Test;
  gettestbyid() {
    this.quizservice.getatest(this.id).subscribe(
      (response: Test) => { this.test = response; },
      (error: HttpErrorResponse) => { alert(error.message); });
  }
  //



  // pixels api
  async searchPhotos(image: any) {
    //console.log('searchPhotos called'); // Add this line
    const query = image;
    const client = createClient('3HmHyURxliuydDWldMrrWvTw7Pq7mF4jpOoYf50Pd1oOdNifZv9JW6IY'); // Pexels API key
    try {
      const response: any = await client.photos.search({ query, per_page: 1 });
      const photos: any[] = response.photos;
      const imageUrl = photos[0]?.src?.original;
      //console.log(imageUrl); // This will log the URL of the image  
      this.aa = imageUrl;
    } catch (error) {
      console.error(error);

    }
  }


}