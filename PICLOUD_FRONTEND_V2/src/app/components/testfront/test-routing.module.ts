import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassatestComponent } from './passatest/passatest.component';
import { AvailabletestsComponent } from './availabletests/availabletests.component';
import { StudyComponent } from './study/study.component';

const routes: Routes = [
  { path: 'passatest/:id', component: PassatestComponent },
  { path: 'study/:id', component: StudyComponent },
  { path: 'availabletest', component: AvailabletestsComponent },
  { path: '', redirectTo: '/testfront/availabletest', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
