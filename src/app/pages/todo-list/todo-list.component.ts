import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from 'src/app/core/models/todo.model';
import { ApplicationState } from 'src/app/store/application-state';
import { TodoSelector } from 'src/app/store/selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos: Todo[] = [];
  //filtroActual: filtrosValidos;

  pendientes$= this.store.select(TodoSelector.selectTotalPendientes);
  constructor(private store: Store<ApplicationState>) { }

  ngOnInit(): void {

  //  this.store.select('todos')
  //   .subscribe( todos => this.todos = todos );
    this.store.subscribe((todos: any) => {
      console.log(todos);
      this.todos = todos.todo;
      console.log(todos);

    });

  }
}
