import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';
import { LoginModel } from 'task-managment/interfaces/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() public errorMessage!: string;
  @Input() public showCancelButton!: boolean;

  @Output() public onLogin = new EventEmitter<LoginModel>();
  @Output() public canceled = new EventEmitter();

  public loginForm!: FormGroup;
  public invalidLogin: boolean = true;

  private destroyed$ = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.onFormChanges();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }


  public login(): void {
    this.onLogin.emit(this.loginForm.value);
  }

  public cancelLogin(): void {
    this.loginForm.reset();
    this.canceled.emit();
  }

  private onFormChanges(): void {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((form: LoginModel) => {
        this.validateForm(form)
      })
  }

  private validateForm(form: LoginModel): void {
    if (form.email && form.password) {
      this.invalidLogin = false;
    }
  }
}
