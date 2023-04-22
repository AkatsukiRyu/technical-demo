import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, tap, takeUntil, BehaviorSubject } from 'rxjs';

import { AuthenticationService } from 'task-managment/app/services/authentication.service';
import { UserModel } from 'task-managment/interfaces/user.model';
import { TasksService } from '../../services/tasks.service';
import { TaskModel } from '../../../../../../d-library/src/tasks-management/models/tasks-mangement.model';
import { TaskType } from 'd-library/tasks-management/enums/task-types';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit, OnDestroy {
  public user$!: Observable<UserModel | null>;
  public tasks$ = new BehaviorSubject<TaskModel[]>([]);
  public edited!: number;
  public taskTittle!: string;
  public taskComment!: string;
  public onAddTask: boolean = false;

  private _destroyed$ = new Subject<boolean>();

  constructor(
    private readonly authService: AuthenticationService,
    private readonly tasksService: TasksService
  ) { }

  public ngOnInit(): void {
    this.user$ = this.authService.getUserLogin()
      .pipe(
        tap(user => {
          if (user) {
            this.getTasks(user.email);
          }
        })
      );
  }

  public ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.unsubscribe();
  }

  public editTask(item: TaskModel): void {
    this.edited = item.id;
    this.taskComment = item.comment;
    this.taskTittle = item.title ? item.title : '';
  }

  public cancelEdited(): void {
    this.edited = -3;
    this.taskComment = '';
    this.taskTittle = '';

    const _validTasks = this.tasks$.value.filter(task => task.id > -1);
    this.tasks$.next([..._validTasks]);
  }

  public addEmptyTask(user: UserModel): void {
    this.onAddTask = true;
    this.edited = -1;
    this.tasks$.next([
      {
        id: -1,
        title: '',
        comment: '',
        createdBy: user.email,
        createdDate: new Date(),
        type: TaskType.Todos
      },
      ...this.tasks$.value
    ])
  }

  private getTasks(email: string): void {
    this.tasksService.getTasks(email)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => {
        this.tasks$.next(data);
      });
  }
}
