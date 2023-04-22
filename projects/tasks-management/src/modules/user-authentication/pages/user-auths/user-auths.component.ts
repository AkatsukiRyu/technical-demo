import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, BehaviorSubject } from "rxjs";
import { UsersService } from '../../services/users.service';
import { LoginModel, UserModel } from 'task-managment/interfaces/user.model';
import { SwalHelper, SweetAlertIconType } from 'd-library/shared/utils/alert.helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auths',
  templateUrl: './user-auths.component.html',
  styleUrls: ['./user-auths.component.scss']
})
export class UserAuthsComponent implements OnInit, OnDestroy {
  public loginAnimationClass: string = 'slide-right';
  public registerAnimationClass: string = 'slide-out-right';
  public emailErrorMess$ = new BehaviorSubject<string>('');

  private destroyed$ = new Subject<boolean>();
  private _users: UserModel[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.getAllUsers();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  public switchToRegisterForm(): void {
    this.registerAnimationClass = 'slide-left';
    this.loginAnimationClass = 'slide-out-left';
  }

  public switchToLoginForm(): void {
    this.loginAnimationClass = 'slide-right';
    this.registerAnimationClass = 'slide-out-right';
  }

  public checkUnique(data: { value: string; key: keyof UserModel }): void {
    const existed = this._users.find(user => user[data.key] === data.value);

    if (!existed) {
      this.emailErrorMess$.next('');
      return;
    }

    this.emailErrorMess$.next('This Email is not unique');
  }

  public onLogin(login: LoginModel): void {
    // Fake Login
    const user = this._users.find(user => user.email === login.email && user.password === login.password);
    this.usersService.login(user).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(response => {
      if (!response.success) {
        SwalHelper.fireAlert({
          iconType: SweetAlertIconType.Error,
          message: response.message || '',
          title: 'Login Error!',
        });

        return;
      }

      this.router.navigate(['']);
    })
  }

  public register(user: UserModel): void {
    this.usersService.registerUser(user)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(response => {
        if (response.success) {
          this.switchToLoginForm();
          this._users.push(user);
          return;
        }

        SwalHelper.fireAlert({
          iconType: SweetAlertIconType.Error,
          title: 'Register Error!',
          message: response.message ? response.message : '',
        });
      });
  }

  private getAllUsers(): void {
    // Normally the step for get all user and check unique is belong to BACKEND
    // I just added here for making this demo more useful => Don't apply this for real environment
    this.usersService.getAllUsers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(users => {
        this._users = [...users];
      })
  }
}
