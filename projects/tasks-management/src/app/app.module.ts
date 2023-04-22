import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCanActivateGuard } from './services/can-activate-main';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicationService } from './services/app.service';
import { InterceptorConfig } from './interceptor/app.interceptor';
import { AuthenticationActivateGuard } from './services/activated-authentication.guard';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HomeCanActivateGuard,
    ApplicationService,
    AuthenticationActivateGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorConfig, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
