import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-questionforome',
  templateUrl: './questionforome.component.html',
  styleUrls: ['./questionforome.component.scss'],
})
export class QuestionforomeComponent implements OnInit {
  //the id of the question that i will use to show the question forom off
  @Input() idOfTheQuestion!: number;
  @Input() refresh!: boolean;

  questionforome: any;  
  constructor(private quizservice: QuizService) {}
  ngOnInit(): void {
    this.getAllQuestionForome();
  }
  getAllQuestionForome() {
    this.quizservice
      .getComments(this.idOfTheQuestion)
      .subscribe(
        (resultofthefiltredlist) =>
          (this.questionforome = resultofthefiltredlist)
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refresh'] && changes['refresh'].currentValue) {
 
      this.refresh = false;
      this.getAllQuestionForome();
    }
}
}
