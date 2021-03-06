import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';

// Feature modules
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';

// Containers
import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

// Services
import { LoggerService } from './shared/logger/logger.service';
import { Store } from '../store';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';

// Guard
import { AuthGuard } from './auth/shared/guards/auth.guard';

// Routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'articles',
    canActivate: [AuthGuard],
    loadChildren: './articles/articles.module#ArticlesModule'
  }
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:3000']
      }
    }),
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    AuthModule,
    MaterialModule
  ],
  providers: [
    LoggerService,
    Store,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
