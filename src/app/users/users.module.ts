import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from './../material.module';

// Services
import { UsersService } from './shared/services/users.service';

// Containers
import { UsersComponent } from './containers/users/users.component';

// Components
import { UserListComponent } from './component/user-list/user-list.component';

export const ROUTES: Routes = [
  { path: '', component: UsersComponent },
  // { path: 'new', canActivate: [AuthGuard], component: UserComponent},
  // { path: ':id', canActivate: [AuthGuard], component: UserComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    MaterialModule
  ],
  exports: [],
  declarations: [
    UsersComponent,
    UserListComponent
  ],
  providers: [UsersService],
})
export class UsersModule {}
