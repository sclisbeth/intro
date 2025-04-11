import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TodoItemComponent } from './todo-item/todo-item.component';



@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoFooterComponent,
    TodoAddComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
