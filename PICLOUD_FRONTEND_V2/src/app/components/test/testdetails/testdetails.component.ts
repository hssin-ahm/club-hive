import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Question, Test } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-testdetails',
  templateUrl: './testdetails.component.html',
  styleUrls: ['./testdetails.component.scss']
})
export class TestdetailsComponent implements OnInit {
  constructor(private quizservice: QuizService, private activateroute: ActivatedRoute, private fb: FormBuilder) { }
  id!: number;
  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params['id']
    this.gettestbyid();
  }
  //get the test by id 
  public test!: Test;
  gettestbyid() {
    this.quizservice.getatest(this.id).subscribe(
      (response: Test) => {
        this.test = response;
        this.newTitle = this.test.title;
        this.newDescription = this.test.description;
      },
      (error: HttpErrorResponse) => { alert(error.message); });
  }

  newTitle = '';
  newDescription = '';

  updateTest() {
    // Implement the logic to update the test with newTitle and newDescription
    this.test.title = this.newTitle;
    this.test.description = this.newDescription;
    // Call your service to save changes, etc.
    this.quizservice.modifyTest(this.test.id, this.newTitle, this.newDescription).subscribe();
  }

  deletequestion(id: number) {
    this.quizservice.deletequestion(id).subscribe();
    const index = this.test.questions.findIndex(question => question.id === id);
    if (index !== -1) {
      this.test.questions.splice(index, 1);
    }
  }

  //add a question
  addthirdoption = false;
  addforthdoption = false;
  oneok = true;
  twook = false;
  treeok = false;
  fourok = false;
  questionText = '';
  answer1 = '';
  answer2 = '';
  answer3 = '';
  answer4 = '';
  question!: Question;
  options!: any[];

  addQuestion(): void {
    this.question = new Question();
    this.question.question = this.questionText;
    this.options = [];
    this.options.push({ answer: this.answer1, iscorrect: this.oneok });
    this.options.push({ answer: this.answer2, iscorrect: this.twook });
  
    if (this.addthirdoption && !this.addforthdoption) {
      this.options.push({ answer: this.answer3, iscorrect: this.treeok });
    }
  
    if (this.addforthdoption) {
      this.options.push({ answer: this.answer3, iscorrect: this.treeok });
      this.options.push({ answer: this.answer4, iscorrect: this.fourok });
    }
  
    this.question.questionOptions = this.options;
  
    this.quizservice.addQuestion(this.test.id, this.question).subscribe(() => {
      this.resetForm();
    });
  }
  
  resetForm(): void {
    // Reset form fields and flags
    this.questionText = '';
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
    this.oneok = true;
    this.twook = false;
    this.treeok = false;
    this.fourok = false;
    this.addthirdoption = false;
    this.addforthdoption = false;
  }
  onlyone(){
    this.oneok = true;
    this.twook = false;
    this.treeok = false;
    this.fourok = false;
  }
  onlytwo(){
    this.oneok = false;
    this.twook = true;
    this.treeok = false;
    this.fourok = false;
  }
  onlytree(){
    this.oneok = false;
    this.twook = false;
    this.treeok = true;
    this.fourok = false;
  }
  onlyfour(){
    this.oneok = false;
    this.twook = false;
    this.treeok = false;
    this.fourok = true;
  }

}