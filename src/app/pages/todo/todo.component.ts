import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions } from 'src/app/store/actions';
import { ApplicationState } from 'src/app/store/application-state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  completado: boolean = false;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit(): void {
  }

  toggleAll() {
    this.completado = !this.completado;

    this.store.dispatch(TodoActions.togleAllAction({ completado: this.completado }));

  }

}
