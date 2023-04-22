import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { TaskModel } from '../../../../../d-library/src/tasks-management/models/tasks-mangement.model';
import { ResponseModel } from 'task-managment/interfaces/api.model';

@Injectable()
export class TasksService {
    constructor(
        private http: HttpClient
    ) { }

    public createTask(task: TaskModel): Observable<ResponseModel> {
        return this.http.post(`tasks`, {
            method: 'POST',
            body: JSON.stringify({
                ...task
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).pipe(
            map(data => {
                return {
                    success: true
                }
            }),
            catchError(error => {
                return of({
                    success: true,
                    message: 'Can not Create Task'
                })
            })
        );
    }

    
    public updateTask(task: TaskModel): Observable<ResponseModel> {
        return this.http.put(`tasks/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...task
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).pipe(
            map(data => {
                return {
                    success: true
                }
            }),
            catchError(error => {
                return of({
                    success: true,
                    message: 'Can not update Task'
                })
            })
        );
    }

    public deleteTask(task: TaskModel): Observable<ResponseModel> {
        return this.http.delete(`tasks/${task.id}`)
        .pipe(
            map(data => {
                return {
                    success: true
                }
            }),
            catchError(error => {
                return of({
                    success: true,
                    message: 'Error while deleting Task'
                })
            })
        );
    }

    public getTasks(userEmail: string): Observable<TaskModel[]> {
        return this.http.get<TaskModel[]>(`tasks?createdBy=${userEmail}`)
            .pipe(
                map(data => {
                    if (!data) {
                        return [];
                    }

                    return data;
                }),
                catchError(error => {
                    console.log(error);
                    return of([]);
                })
            )
    }
}
