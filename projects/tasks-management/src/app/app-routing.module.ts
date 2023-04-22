import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCanActivateGuard } from './services/can-activate-main';
import { AuthenticationActivateGuard } from './services/activated-authentication.guard';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [HomeCanActivateGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../modules/task-management/task-management.module').then(m => m.TaskManagementModule)
      }
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'auths',
    canActivate: [AuthenticationActivateGuard],
    loadChildren: () => import('../modules/user-authentication/user-authentication.module').then(m => m.UserAuthenticationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
