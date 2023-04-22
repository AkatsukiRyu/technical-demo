import { Injectable } from '@angular/core';
import { Observable, map, of, catchError, BehaviorSubject } from 'rxjs';

import { AppConfigurationModel } from '../models/app-config.model';
import { UserModel } from 'task-managment/interfaces/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userLogin$ = new BehaviorSubject<UserModel | null>({
    email: 'khang@gmail.com',
    fullname: 'Khang Nguyen'
  });
  private _appConfigration!: AppConfigurationModel;

  constructor(
    private http: HttpClient
  ) { }

  public getApplicationConfiguration(): AppConfigurationModel {
    return this._appConfigration;
  }

  public getExternalCofnigration(): Observable<AppConfigurationModel> {
    return this.http.get('assets/application-configuration.json', { responseType: 'text' })
      .pipe(
        map((configuration: string) => {
          this._appConfigration = {
            api: ''
          };

          if (!configuration) {
            return this._appConfigration;
          }

          this._appConfigration = JSON.parse(configuration);
          return this._appConfigration;
        }),
        catchError(error => {
          this._appConfigration = {
            api: ''
          }
          return of(this._appConfigration);
        })
      );
  }

  public checkSession(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }

    const _user = JSON.parse(user);
    this.userLogin$.next(_user);
  }

  public setUserLoginSession(user: UserModel, remember?: boolean): void {
    this.userLogin$.next(user);

    if (remember) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  public getUserLogin(): BehaviorSubject<UserModel | null> {
    return this.userLogin$;
  }
}
