import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LibaryComponent } from './components/libary/libary/libary.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/interceptor.service';



import { EventdetailsComponent } from './views/pages/events/eventdetails/eventdetails.component';
import { EventformComponent } from './views/pages/events/eventform/eventform.component';
import { EventdetailadminComponent } from './views/pages/events/eventdetailsadmin/eventdetailadmin.component'; 
import { AngularCropperjsModule } from 'angular-cropperjs';



//import { ClubCreateComponent } from './components/clubs/club-create/club-create.component';
//import { ClublistadminsiteComponent } from './components/clubs/clublistadminsite/clublistadminsite.component';
@NgModule({


  declarations: [
    AppComponent,
    ErrorPageComponent,

    EventdetailsComponent,
    EventformComponent,
    LibaryComponent,
    EventdetailadminComponent,
    
   // ClubCreateComponent,
    //ClublistadminsiteComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,

    ReactiveFormsModule,
    HttpClientModule,
    NgbAccordionModule,
    NgSelectModule,
    FormsModule,
    SweetAlert2Module.forRoot(),

    ReactiveFormsModule, 
    HttpClientModule,
    FormsModule,
    AngularCropperjsModule

  ],
  providers: [
    
    AuthGuardService,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),

        },
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}