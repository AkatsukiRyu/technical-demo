import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthsComponent } from './pages/user-auths/user-auths.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UserAuthsComponent
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class UserAuthenticationRoutingModule {}
