import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { TaskModel } from '../../../../../d-library/src/tasks-management/models/tasks-mangement.model';
import { tasksMock } from '../models/mock.data';

@Injectable()
export class TasksService {
    constructor(
        private http: HttpClient
    ) { }

    public getTasks(userEmail: string): Observable<TaskModel[]> {
        return this.http.get<TaskModel[]>(`tasks/${userEmail}`)
            .pipe(
                map(data => {
                    if (!data) {
                        return tasksMock
                    }

                    return data;
                }),
                catchError(error => {
                    return of(tasksMock);
                })
            )
    }
}
