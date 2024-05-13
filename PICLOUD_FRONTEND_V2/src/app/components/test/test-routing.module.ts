import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { ImportquizComponent } from './importquiz/importquiz.component';
import { GeneratequizComponent } from './generatequiz/generatequiz.component';
const routes: Routes = [{ path: '', component: TestComponent, children: [
  // Optional children routes can be added here
]
},{path:'testdetails/:id',component:TestdetailsComponent},
{path:'ImportquizComponent',component:ImportquizComponent},
{path:'GeneratequizComponent',component:GeneratequizComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
