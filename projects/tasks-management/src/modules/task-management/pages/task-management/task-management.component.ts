import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, tap, takeUntil, BehaviorSubject, findIndex } from 'rxjs';

import { AuthenticationService } from 'task-managment/app/services/authentication.service';
import { UserModel } from 'task-managment/interfaces/user.model';
import { TasksService } from '../../services/tasks.service';
import { TaskModel } from '../../../../../../d-library/src/tasks-management/models/tasks-mangement.model';
import { TaskType } from 'd-library/tasks-management/enums/task-types';
import { SwalHelper, SweetAlertIconType } from 'd-library/shared/utils/alert.helpers';
import { SearchConfigurationModel } from 'd-library/forms/interfaces/search.model';

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
  public searchConfiguration!: SearchConfigurationModel;

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

  public cancelEdited(blockAsisnTask?: boolean): void {
    this.edited = -3;
    this.taskComment = '';
    this.taskTittle = '';

    if (blockAsisnTask) {
      return;
    }

    const _validTasks = this.tasks$.value.filter(task => task.id > -1);

    this.searchConfiguration = {
      ...this.searchConfiguration,
      data: [..._validTasks]
    }
    this.tasks$.next([..._validTasks]);
  }

  public updateTask(): void {
    const updatedTask = this.tasks$.value.find(task => task.id === this.edited);

    if (!updatedTask) {
      SwalHelper.fireAlert({
        iconType: SweetAlertIconType.Error,
        title: 'failed Updating',
        message: 'Can not find Task in list'
      });
      return;
    }

    if (updatedTask.id === -1) {
      this.createdTask(updatedTask);
      return;
    }

    this.tasksService.updateTask({
      ...updatedTask,
      title: this.taskTittle,
      comment: this.taskComment
    }).pipe(takeUntil(this._destroyed$))
      .subscribe(response => {
        if (!response.success) {
          SwalHelper.fireAlert({
            iconType: SweetAlertIconType.Error,
            title: 'Failed Updating',
            message: 'Can not update Task'
          });
          return;
        }

        const _tasks = this.tasks$.value.map(task => {
          if (task.id === updatedTask.id) {
            return {
              ...updatedTask,
              title: this.taskTittle,
              comment: this.taskComment
            };
          }

          return task;
        });

        this.tasks$.next([..._tasks]);
        this.searchConfiguration = {
          ...this.searchConfiguration,
          data: [..._tasks]
        }
        this.cancelEdited(true);
      });
  }

  public changeTaskStatus(taskStatus: { task: TaskModel, type: TaskType }): void {
    const updatedTask = {
      ...taskStatus.task,
      type: taskStatus.type
    }

    this.tasksService.updateTask(updatedTask)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(response => {
        if (!response.success) {
          SwalHelper.fireAlert({
            iconType: SweetAlertIconType.Error,
            title: 'Failed Updating',
            message: 'Can not change Task\'s status'
          });
          return;
        }

        const _tasks = this.tasks$.value;
        const _updatedTask = _tasks.map(it => {
          if (it.id === updatedTask.id) {
            return {
              ...updatedTask
            };
          }

          return it;
        });

        this.tasks$.next([..._updatedTask]);
        this.searchConfiguration = {
          ...this.searchConfiguration,
          data: [..._updatedTask]
        }
      });
  }

  public createdTask(task: TaskModel): void {
    const newTask = {
      ...task,
      title: this.taskTittle,
      comment: this.taskComment,
      createdDate: new Date()
    };

    this.tasksService.createTask(newTask).pipe(takeUntil(this._destroyed$))
      .subscribe(response => {
        if (!response.success) {
          SwalHelper.fireAlert({
            iconType: SweetAlertIconType.Error,
            title: 'Failed Updating',
            message: 'Can not update Task'
          });
          return;
        }

        const _tasks = this.tasks$.value;

        this.tasks$.next([..._tasks.filter(it => it.id >= 0), {
          ...newTask,
          id: _tasks.length + 1 // no worrying this, just doing something different
        }]);
        this.searchConfiguration = {
          ...this.searchConfiguration,
          data: [...this.tasks$.value]
        }

        this.cancelEdited(true);
      });
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

  public async deleteTask(task: TaskModel) {

    const result = await SwalHelper.fireAlert({
      iconType: SweetAlertIconType.Warning,
      title: 'Warning!',
      message: `make sure you want to delete this task: ${task.title || task.createdBy}`,
      showCancel: true
    });

    if (!result.isConfirmed) {
      return;
    }

    this.tasksService.deleteTask(task)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(response => {
        if (!response.success) {
          SwalHelper.fireAlert({
            iconType: SweetAlertIconType.Error,
            title: 'Failed Deleting!',
            message: response.message || 'Can not delete task'
          });
          return;
        }

        const _tasks = this.tasks$.value;

        const _deletedIndex = _tasks.findIndex(it => it.id === task.id);
        if (_deletedIndex < 0) {
          return;
        }

        _tasks.splice(_deletedIndex, 1);
        this.tasks$.next([..._tasks]);
        this.searchConfiguration = {
          ...this.searchConfiguration,
          data: [..._tasks]
        }
      })
  }

  private getTasks(email: string): void {
    this.tasksService.getTasks(email)
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => {
        this.tasks$.next(data);
        this.searchConfiguration = {
          data: [...data],
          prequisitionType: 'OR',
          searchBys: ['title', 'comment'],
          callback: (items: TaskModel[]) => this.tasks$.next(items)
        }
      });
  }

}
