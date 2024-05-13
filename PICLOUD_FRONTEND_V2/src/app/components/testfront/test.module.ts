import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { PassatestComponent } from './passatest/passatest.component';
import { AvailabletestsComponent } from './availabletests/availabletests.component';
import { FormsModule } from '@angular/forms';
//import { MatPaginatorModule } from '@angular/material/paginator';
import { TowerBlocksComponent } from './tower-blocks/tower-blocks.component';
import { ZenquotesComponent } from './zenquotes/zenquotes.component';
import { StudyComponent } from './study/study.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { QuestionforomeComponent } from './questionforome/questionforome.component';
import { StudyforomComponent } from './studyforom/studyforom.component';


@NgModule({
  declarations: [
    PassatestComponent,
    AvailabletestsComponent,
    TowerBlocksComponent,
    ZenquotesComponent,
    StudyComponent,
    YoutubeComponent,
    QuestionforomeComponent,
    StudyforomComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
   // MatPaginatorModule
  ]
})
export class TestModulefront { }
