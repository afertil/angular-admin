import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Services
import { UsersService } from './shared/services/users.service';

// Containers
import { UsersComponent } from './containers/users/users.component';

export const ROUTES: Routes = [
  { path: '', component: UsersComponent },
  // { path: 'new', canActivate: [AuthGuard], component: UserComponent},
  // { path: ':id', canActivate: [AuthGuard], component: UserComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  declarations: [
    UsersComponent
  ],
  providers: [UsersService],
})
export class UsersModule {}
