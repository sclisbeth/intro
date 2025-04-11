import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './core/components/users/users.component';
import { UsersFormComponent } from './core/components/users-form/users-form.component';
import { TodoComponent } from './pages/todo/todo.component';


const routes: Routes = [
  { path: 'e1', component: UsersFormComponent },
  { path: 'e2', component: UsersComponent },
  { path: 'e3', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
