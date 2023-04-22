import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagementComponent } from './pages/task-management/task-management.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TaskManagementComponent
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class TaskManagementRoutingModule {}
