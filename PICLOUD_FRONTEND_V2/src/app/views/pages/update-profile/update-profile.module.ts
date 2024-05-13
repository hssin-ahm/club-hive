import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';

// ngx-quill
import { QuillModule } from 'ngx-quill';

// angular-archwizard
import { ArchwizardModule } from 'angular-archwizard';

import { UpdateProfileComponent } from './update-profile.component'; 
import { UpdateUserComponent } from './update-user/update-user.component';


const routes: Routes = [
  {
    path: '',
    component : UpdateProfileComponent ,
    children: [
      {
        path: '',
        redirectTo: 'update-user',
        pathMatch: 'full'
      },
      {
        path: 'update-user',
        component: UpdateUserComponent
      },
      
    ]
  }
]

@NgModule({
  declarations: [ UpdateProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    QuillModule.forRoot(), // ngx-quill
    ArchwizardModule, // angular-archwizard
  ],
  exports: [FormsModule] // add this line
})
export class updateProfileModule { }
