import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';

// Feature modules
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';

// Containers
import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

// Services
import { LoggerService } from './shared/logger/logger.service';
import { Store } from '../store';

// Guard
import { AuthGuard } from './auth/shared/guards/auth.guard';

// Routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: 'users', canActivate: [AuthGuard], loadChildren: './users/users.module#UsersModule'},
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
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_ROUTES),
    RouterModule.forRoot(ROUTES),
    AuthModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    LoggerService,
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
