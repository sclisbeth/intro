import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LettersDirective } from './directives/letters.directive';


import { UsersComponent } from './components/users/users.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UserCardComponent } from './components/user-card/user-card.component';



@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    UserCardComponent,
    LettersDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CoreModule { }
