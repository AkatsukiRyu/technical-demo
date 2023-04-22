import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './components/tasks/tasks.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DoneDirective, InprogressTaskDirective, TodoTaskDirective } from './directives/task.directive';

@NgModule({
  declarations: [
    TasksComponent,
    TodoTaskDirective,
    InprogressTaskDirective,
    DoneDirective
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    TasksComponent,
    TodoTaskDirective,
    InprogressTaskDirective,
    DoneDirective
  ]
})
export class TasksManagementModule { }
