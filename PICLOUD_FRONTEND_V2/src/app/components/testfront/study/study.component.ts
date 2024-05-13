import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Test } from 'src/app/models/quiz';
import { User } from 'src/app/models/user.model';
import { JwtService } from 'src/app/services/jwt.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit{

  refreshQuestionForome: boolean = false;
  
  connecteduser:any;
  addedquestion: any = { body: '' ,userId:'',userimage:'',username:'',questionId:'' };
  asksomeone(body: string, userId: string, userimage: string, username: string, questionId: string) {
    const addedQuestion = { body, userId, userimage, username, questionId };
    this.quizservice.addAQuestionToAcours(addedQuestion).subscribe(()=>this.refreshQuestionForome = true);
  }
  

  iframeValues: Array<SafeResourceUrl> = [];
  currentIframeUrl: SafeResourceUrl | undefined;
  isIframeExpanded: boolean = false;

  openIFrame(url: string): void {
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.currentIframeUrl = sanitizedUrl;
    this.isIframeExpanded = true;
    console.log(url);
  }
constructor(private jwt:JwtService,private quizservice: QuizService, private activateroute: ActivatedRoute,
  private sanitizer: DomSanitizer,private auth:UserService){}
id:any;
ngOnInit(): void {
  this.id = this.activateroute.snapshot.params['id']
  this.gettestbyid();
  this.auth.getUserbyemail(this.jwt.getemail()).subscribe(
    (user: User) => {
      this.connecteduser = user;
    },
    (error) => {
      console.error('Error fetching user data:', error);
      // Handle error accordingly
    }
  );

}
public test!: Test;
gettestbyid() {
  this.quizservice.getatest(this.id).subscribe(
    (response: Test) => { this.test = response; },
    (error: HttpErrorResponse) => { alert(error.message); });
}


}
