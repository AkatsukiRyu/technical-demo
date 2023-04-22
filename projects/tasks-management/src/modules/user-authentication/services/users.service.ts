import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from "rxjs";
import { AuthenticationService } from 'task-managment/app/services/authentication.service';
import { ResponseModel } from 'task-managment/interfaces/api.model';
import { UserModel } from 'task-managment/interfaces/user.model';

@Injectable()
export class UsersService {
    constructor(
        private readonly http: HttpClient,
        private readonly authService: AuthenticationService
    ) { }

    public login(user: UserModel | undefined): Observable<ResponseModel> {
        if (!user) {
            return of({
                success: false,
                message: 'There are something wrong with your Email or Password'
            });
        }

        this.authService.setUserLoginSession(user);
        return of({
            success: true
        });
    }

    public getAllUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>('users')
            .pipe(
                map(users => {
                    return users;
                }),
                catchError(error => {
                    console.log(error);
                    return of([]);
                })
            )
    }

    public registerUser(user: UserModel): Observable<ResponseModel> {
        return this.http.post('users', {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                fullname: user.fullname,
                password: user.password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).pipe(
            map(response => {
                // This not real behavior for checking response :) thanks for understanding
                return {
                    success: true
                };
            }),
            catchError(error => {
                console.log(error);
                return of({
                    success: false,
                    message: 'Can not created new User'
                })
            })
        )
    }
}