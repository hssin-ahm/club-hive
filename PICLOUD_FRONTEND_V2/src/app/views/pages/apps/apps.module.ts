import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde'

import { AppsComponent } from './apps.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { EmailComponent } from './email/email.component';
import { InboxComponent } from './email/inbox/inbox.component';
import { ReadComponent } from './email/read/read.component';
import { ComposeComponent } from './email/compose/compose.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { ClubCreateComponent } from 'src/app/components/clubs/club-create/club-create.component';
import { ClublistadminsiteComponent } from 'src/app/components/clubs/clublistadminsite/clublistadminsite.component';
import { ArchwizardModule } from 'angular-archwizard';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MembersListComponent} from 'src/app/components/members/members-list/members-list.component';
import { MemberCreateComponent } from 'src/app/components/members/member-create/member-create.component';
import { BehaviorScoreListComponent} from 'src/app/components/BehaviorScore/behaviorscore-list/behaviorscore-list.component';
import { BehaviorscoreCreateComponent } from 'src/app/components/BehaviorScore/behaviorscore-create/behaviorscore-create.component';
import { DepartmentListComponent } from 'src/app/components/department/department-list/department-list.component';
import { DepartmentCreateComponent } from 'src/app/components/department/department-create/department-create.component';
import { DepartmentDetailsComponent } from 'src/app/components/department/department-details/department-details.component';
import { DepartmentUpdateComponent } from 'src/app/components/department/department-update/department-update.component';
import { FinanceCreateComponent } from 'src/app/components/transaction/finance-create/finance-create.component';
import { FinanceListComponent } from 'src/app/components/transaction/finance-list/finance-list.component';
import { ClubListComponent } from 'src/app/components/clubs/club-list/club-list.component';
import {MyapplicationComponent} from 'src/app/components/RequestToJoin/myapplication/myapplication.component';
import {ClubListAdminComponent} from 'src/app/components/clubs/club-list-admin/club-list-admin.component';
import {ClubDetailsComponent} from 'src/app/components/clubs/club-details/club-details.component';
import {ClubEditComponent} from 'src/app/components/clubs/club-edit/club-edit.component';
import {TestModule} from 'src/app/components/test/test.module';
import {RequestListComponent} from 'src/app/components/RequestToJoin/request-list/request-list.component';
import {ListclubtojoinComponent} from 'src/app/components/clubs/listclubtojoin/listclubtojoin.component';
import {TestModulefront} from 'src/app/components/testfront/test.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { VideocallComponent } from './chat/components/videocall/videocall.component';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { EmojiComponent } from './chat/components/emoji/emoji.component';
import { LibaryComponent } from 'src/app/components/libary/libary/libary.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {

  suppressScrollX: true
};

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

const routes: Routes = [
  {
    path: '',
    component: AppsComponent,
    children: [
      { path: 'testfront/:clubId', loadChildren: () => import('src/app/components/testfront/test.module').then(m => m.TestModulefront) },
      {path: 'clublisttojoin',component:ListclubtojoinComponent},
      {path: 'requestlist',component:RequestListComponent},
      {path: 'test', loadChildren: () => import('src/app/components/test/test.module').then((m)=> m.TestModule)},
      {path:'clubedit',component:ClubEditComponent},
      {path:'clublistadmin',component:ClubDetailsComponent},
      {path:'myapplication',component:MyapplicationComponent},
      { path: 'clubs', component: ClubListComponent },
      { path: 'finance/create', component: FinanceCreateComponent},
      { path: 'finances', component: FinanceListComponent},
      { path: 'departments', component: DepartmentListComponent},
      { path: 'department/create/:id', component: DepartmentCreateComponent },
      { path: 'department/update/:iddepartment/:idclub', component: DepartmentUpdateComponent },
      { path: 'department/get/:id', component: DepartmentDetailsComponent },
      { path: 'behavior-score/list/:userId/:clubId', component: BehaviorScoreListComponent },
      { path: 'behavior-score/create/:userId/:clubId', component: BehaviorscoreCreateComponent },
      { path: 'members', component: MembersListComponent},
      { path: 'member/create', component: MemberCreateComponent},
      {path:'clubadminsite',component:ClublistadminsiteComponent},
      { path: 'club/create', component: ClubCreateComponent },
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full',
      },
      {
        path: 'email',
        component: EmailComponent,
        children: [
          {
            path: '',
            redirectTo: 'inbox',
            pathMatch: 'full'
          },
          {
            path: 'inbox',
            component: InboxComponent
          },
          {
            path: 'read',
            component: ReadComponent
          },
          {
            path: 'compose',
            component: ComposeComponent
          }
        ]
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'library',
        component: LibaryComponent
      },
      {
        path: 'video-call',
        component: VideocallComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
    ]
  }
]

@NgModule({
  declarations: [EmailComponent, ChatComponent, CalendarComponent, AppsComponent, 
    ClubCreateComponent,
    ClublistadminsiteComponent,
    MemberCreateComponent,
    MembersListComponent,
    BehaviorScoreListComponent,
    BehaviorscoreCreateComponent,
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentDetailsComponent,
    DepartmentUpdateComponent,
    FinanceListComponent,
    FinanceCreateComponent,
    ClubListComponent,
    MyapplicationComponent,
    ClubListAdminComponent,
    ClubDetailsComponent,
    ClubEditComponent,
    RequestListComponent,
    ListclubtojoinComponent,
    InboxComponent, ReadComponent, ComposeComponent,
    EmojiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FullCalendarModule, // import the FullCalendar module! will make the FullCalendar component available
    PerfectScrollbarModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCollapseModule,
    NgSelectModule,
    ReactiveFormsModule,
    ArchwizardModule,
    AngularCropperjsModule,
    CarouselModule,
    SweetAlert2Module.forRoot(),
    NgxDatatableModule,
    TestModule,
    NgbModule,
    NgxEmojiPickerModule,
    TestModulefront,
    NgbPaginationModule,
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      useValue: {}
    })
  ],
  exports: [
    ClubCreateComponent,
    ClublistadminsiteComponent,
    // other components...
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AppsModule { }