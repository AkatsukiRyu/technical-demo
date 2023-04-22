import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ContentChild, TemplateRef } from '@angular/core';
import { TaskType } from '../../enums/task-types';
import { TaskModel } from '../../models/tasks-mangement.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DoneDirective, InprogressTaskDirective, TodoTaskDirective } from 'd-library/tasks-management/directives/task.directive';

@Component({
  selector: 'lib-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnChanges {
  @ContentChild(TodoTaskDirective, { read: TemplateRef, static: false })
  public todoTemplateRef!: any;
  @ContentChild(InprogressTaskDirective, { read: TemplateRef })
  public inprogressTemplateRef!: any;
  @ContentChild(DoneDirective, { read: TemplateRef })
  public doneTemplateRef!: any;

  @Input() public taskData!: Array<TaskModel>;
  @Input() public formatDate: string = 'dd-MMM-yyyy hh:mm';
  @Input() public disabledDragItem!: number;
  @Input() public todosContainerClasses: string[] | string = ['base-container-style'];
  @Input() public inprogressContainerClasses: string[] | string = ['base-container-style'];
  @Input() public doneContainerClasses: string[] | string = ['base-container-style'];
  @Input() public taskboxClasses: string[] | string = ['base-box'];

  @Output() public onDropedTask = new EventEmitter<{ task: TaskModel, type: TaskType }>();

  public todos: Array<TaskModel> = [];
  public inprogress: Array<TaskModel> = [];
  public done: Array<TaskModel> = [];

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      return;
    }

    if (changes['taskData'] && this.taskData) {
      this.filterTasks();
    }
  }

  public drop(event: CdkDragDrop<TaskModel[]>, type: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const _prevIndex = event.previousIndex;
      const _prevData = event.previousContainer.data;
      const dropedItem = _prevData[_prevIndex];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.onDropedTask.emit({
        task: dropedItem,
        type: type
      });
    }
  }

  public onDropItem(event: CdkDragDrop<TaskModel[]>, type: any): void {
    /*  const _prevIndex = event.previousIndex;
     const _prevData = event.previousContainer.data;
 
     const dropedItem = _prevData[_prevIndex];
     console.log(dropedItem, type);
 
     this.onDropedTask.emit({
       task: dropedItem, 
       type: type
     }); */
  }

  private filterTasks(): void {
    this.todos = [...this.taskData.filter(task => task.type === TaskType.Todos)];
    this.inprogress = [...this.taskData.filter(task => task.type === TaskType.Inprogress)];
    this.done = [...this.taskData.filter(task => task.type === TaskType.Done)];
  }

}
