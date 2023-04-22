import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { UserModel } from 'task-managment/interfaces/user.model';
import { FormValidators } from '../../utils/form-validator.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public emailErrorMessage!: string;
  @Input() public currentUser!: UserModel | null;
  @Input() public showCancelButton!: boolean;

  @Output() public registryUser = new EventEmitter<UserModel>();
  @Output() public updateUser = new EventEmitter<UserModel>();
  @Output() public checkIsUnique = new EventEmitter<{value: string; key: keyof UserModel}>();
  @Output() public cancelRegistry = new EventEmitter();

  public registryForm!: FormGroup;
  public countries: string[] = [];
  public confirmPassMess$ = new BehaviorSubject<{ message?: string; valid: boolean }>({valid: false, message: 'Filled your confirm Password'});
  public confirmPassErrorMess$ = new BehaviorSubject<string>('');
  public invalidEmailErrorMess$ = new BehaviorSubject<string>('');
  public usernameErrorMess$ = new BehaviorSubject<string>('');

  public title: string = 'SIGN UP';
  public isFormValid: boolean = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.registryForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, FormValidators.emailValidator])
    });

    this.setDefaultFormValue();
    this.listenConfirmPasswordRules();
    this.listenEmailChanges();
    this.listenFormChanges()
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      return;
    }

    // Issue on can not detect change this field in some case
    if (changes['emailErrorMessage'] && this.emailErrorMessage) {
      this.invalidEmailErrorMess$.next(this.emailErrorMessage);
      this.validateForm();
    }

    if (changes['currentUser'] && this.currentUser && this.registryForm) {
      this.setDefaultFormValue();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public get emailErrorFormatted() : string {
    const emailControl = this.registryForm.get('email');

    return emailControl && emailControl.errors && emailControl.errors['message'];
  }

  public submitRegistry(): void {
    this.registryUser.emit({
      ...this.registryForm.value
    });
  }

  public onCancel(): void {
    this.registryForm.reset();
    this.cancelRegistry.emit();
  }


  public checkUnique(formName: keyof UserModel): void {
    const control = this.registryForm.get(formName);

    if (!control) {
      return;
    }

    const value = control.value;
    if (!value) {
      return;
    }

    this.checkIsUnique.emit({
      key: formName,
      value: value
    })
  }

  private setDefaultFormValue(): void {
    if (!this.currentUser) {
      return;
    }

    this.registryForm.setValue({
      fullname: this.currentUser.fullname,
      password: '',
      confirmPassword: '',
      email: this.currentUser.email,
    } as UserModel);
  }

  private listenFormChanges(): void {
    this.registryForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((form: UserModel) => {
        this.validateForm();
      })
  }

  private validateForm(): void {
    this.isFormValid = false;

    if (this.registryForm.errors) {
      return;
    }

    if (this.registryForm.get('email')?.errors || !this.confirmPassMess$.value.valid) {
      return;
    }

    if (this.emailErrorMessage) {
      return;
    }

    this.isFormValid = true;
  }

  private listenEmailChanges(): void {
    this.registryForm.get('email')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          const emailControl = this.registryForm.get('email');
          if (emailControl?.errors) {
            this.invalidEmailErrorMess$.next(emailControl.errors['message']);
            return;
          }

          this.invalidEmailErrorMess$.next('');
        });
  }

  private listenConfirmPasswordRules(): void {
    this.registryForm
      .get('confirmPassword')?.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(confirmPass => {
        const _password = this.registryForm.get('password')?.value;
        if (_password !== confirmPass) {
          const mess = 'Your Confirm Password does not match with Password';
          this.confirmPassMess$.next({ message: mess, valid: false });
          this.confirmPassErrorMess$.next(mess);
          return;
        }

        if (!_password && !confirmPass) {
          this.confirmPassMess$.next({message: 'Filled your confirm Password', valid: false});
          return;
        }

        this.confirmPassErrorMess$.next('');
        this.confirmPassMess$.next({ valid: true, message: 'Matched' });
      });
  }


}
