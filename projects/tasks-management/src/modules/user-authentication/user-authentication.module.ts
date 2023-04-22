import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthsComponent } from './pages/user-auths/user-auths.component';
import { UserAuthenticationRoutingModule } from './user-athentication.routing.module';
import { UserFormsModule } from '../user-forms/user-forms.module';



@NgModule({
  declarations: [
    UserAuthsComponent
  ],
  imports: [
    CommonModule,
    UserAuthenticationRoutingModule,
    UserFormsModule
  ]
})
export class UserAuthenticationModule { }
