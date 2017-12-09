import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';

// Feature modules
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

// Containers
import { AppComponent } from './app.component';

// Components
import { AppHeaderComponent } from './shared/app-header/app-header.component';

// Services
import { LoggerService } from './shared/logger/logger.service';

// Routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

// JWT
export const JWT_ROUTES = {
  config: {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    whitelistedDomains: ['localhost:3000']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_ROUTES),
    RouterModule.forRoot(ROUTES),
    AuthModule,
    DashboardModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
