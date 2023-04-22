import { Component } from '@angular/core';

@Component({
  selector: 'app-user-auths',
  templateUrl: './user-auths.component.html',
  styleUrls: ['./user-auths.component.scss']
})
export class UserAuthsComponent {
  public loginAnimationClass: string = 'slide-right';
  public registerAnimationClass: string = 'slide-out-right';



  constructor(
  ) { }

  public switchToRegisterForm(): void {
    this.registerAnimationClass = 'slide-left';
    this.loginAnimationClass = 'slide-out-left';
  }

  public switchToLoginForm(): void {
    this.loginAnimationClass = 'slide-right';
    this.registerAnimationClass = 'slide-out-right';
  }
}
