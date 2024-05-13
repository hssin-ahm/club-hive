import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { ClubService } from 'src/app/services/club.service';
import { JwtService } from 'src/app/services/jwt.service';

import { UserService } from 'src/app/services/user.service';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-importquiz',
  templateUrl: './importquiz.component.html',
  styleUrls: ['./importquiz.component.scss']
})
export class ImportquizComponent implements OnInit{
  club:any;
  idUser: any;
  constructor(private quizservice: QuizService,
    private userService: UserService,
    private jwtService:JwtService,
    private clubService:ClubService
  ){}
ngOnInit(): void {
  this.getNonAnsredQuestions();
  let email = this.jwtService.getemail();
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
  );
}
  importjson(event: any) {
    const file = event.target.files[0];
    const fileName = file.name;

    const codeimage = this.extractNumberFromFileName(fileName);
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      const parsedJson = JSON.parse(fileContent);
      const quiz: Quiz = Object.assign(new Quiz(), parsedJson);

      console.log('this is the end',quiz);
      this.quizservice.addQuiz(quiz,codeimage? codeimage:"").subscribe(
        (response) => {
          console.log('Quiz added successfully');
          this.clubService.updateClubTest(this.club.id, response).subscribe(
            () => {
              location.reload();
            } 
          );
        },
        (error) => {
          console.error('Failed to add quiz:', error);
        }
      );
    };

    reader.readAsText(file);
  }
  private extractNumberFromFileName(fileName: string): string | null {
    const numberRegex = /\d+/; // Regular expression to match a number
    const matches = fileName.match(numberRegex);

    if (matches && matches.length > 0) {
      return matches[0];
    }

    return null;
  }
  replyText!:string;
  replyToADevolopper(idQ:any,idd:any){

    this.quizservice.replyToQuestion(idQ,this.replyText,idd).subscribe(()=>this.getNonAnsredQuestions());
  }
  allquestionsnotansered:any
  getNonAnsredQuestions(){

    this.quizservice.getCommentsThatNeedToBeAnnsered().subscribe((res)=>this.allquestionsnotansered=res);
  }

  
}
