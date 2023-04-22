import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as angularFormsModule } from "@angular/forms";
import { TaskManagementComponent } from './pages/task-management/task-management.component';
import { TaskManagementRoutingModule } from './task-management.routing.module';
import { FormsModule } from 'd-library/forms';
import { TasksManagementModule } from 'd-library/tasks-management';
import { TasksService } from './services/tasks.service';



@NgModule({
  declarations: [
    TaskManagementComponent
  ],
  imports: [
    CommonModule,
    TaskManagementRoutingModule,
    FormsModule,
    angularFormsModule,
    TasksManagementModule
  ],
  providers: [
    TasksService
  ]
})
export class TaskManagementModule { }
