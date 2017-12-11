import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Shared modules
import { MaterialModule } from './../material.module';

// Containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const ROUTES: Routes = [
  { path: '', component: DashboardComponent}
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
