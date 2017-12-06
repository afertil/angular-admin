import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Feature modules
import { AuthModule } from './auth/auth.module';

// Containers
import { AppComponent } from './app.component';

// Components

// Routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
