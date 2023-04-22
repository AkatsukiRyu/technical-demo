import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppMenus } from './constanst/app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApplicationService } from './services/app.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public appMenus = AppMenus;
  
  private _destroyed$ = new Subject<boolean>();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly appService: ApplicationService,
    private readonly authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.authService.getExternalCofnigration()
      .pipe(takeUntil(this._destroyed$))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.unsubscribe();
  }

  public navigateTo(paths: string[]): void {
    this.router.navigate(paths, { relativeTo: this.activatedRoute });
  }
}
