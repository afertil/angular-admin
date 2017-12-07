import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Shared modules
import { MaterialModule } from './../material.module';

// Guards
import { AuthGuard } from '../auth/shared/guards/auth.guard';

// Containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const ROUTES: Routes = [
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent}
];

@NgModule({
  imports: [
    MaterialModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {}
