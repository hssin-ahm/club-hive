import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { ResetPasswordComponent } from './views/pages/auth/reset-password/reset-password.component';
import { LibaryComponent } from './components/libary/libary/libary.component';

import { EventdetailsComponent } from './views/pages/events/eventdetails/eventdetails.component';
import { EventformComponent } from './views/pages/events/eventform/eventform.component';
import { EventdetailadminComponent } from './views/pages/events/eventdetailsadmin/eventdetailadmin.component';


import { ClubCreateComponent } from './components/clubs/club-create/club-create.component';
import { ClublistadminsiteComponent } from './components/clubs/clublistadminsite/clublistadminsite.component';

const routes: Routes = [
  //{path:'clubadminsite',component:ClublistadminsiteComponent},
  //{ path: 'club/create', component: ClubCreateComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {

        path: 'libary',
        component: LibaryComponent,
      },{
        path: 'events',
        component: EventdetailsComponent
      },
      {
        path: 'eventform',
        component: EventformComponent

      },
      {
        path:'eventdetailsadmin',
        component : EventdetailadminComponent

      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./views/pages/apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./views/pages/ui-components/ui-components.module').then(
            (m) => m.UiComponentsModule
          ),
      },
      {
        path: 'advanced-ui',
        loadChildren: () =>
          import('./views/pages/advanced-ui/advanced-ui.module').then(
            (m) => m.AdvancedUiModule
          ),
      },
      {
        path: 'form-elements',
        loadChildren: () =>
          import('./views/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule
          ),
      },
      {
        path: 'update-profile',
        loadChildren: () =>
          import('./views/pages/update-profile/update-profile.module').then(
            (m) => m.updateProfileModule
          ),
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () =>
          import(
            './views/pages/advanced-form-elements/advanced-form-elements.module'
          ).then((m) => m.AdvancedFormElementsModule),
      },
      {
        path: 'charts-graphs',
        loadChildren: () =>
          import('./views/pages/charts-graphs/charts-graphs.module').then(
            (m) => m.ChartsGraphsModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/pages/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/pages/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'general',
        loadChildren: () =>
          import('./views/pages/general/general.module').then(
            (m) => m.GeneralModule
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ],
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent,
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
