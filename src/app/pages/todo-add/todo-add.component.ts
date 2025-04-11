import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoActions } from 'src/app/store/actions';
import { ApplicationState } from 'src/app/store/application-state';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent {
  txtInput: FormControl;

  constructor(private store: Store<ApplicationState>) {
    this.txtInput = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
  }

  agregar() {

    if (this.txtInput.invalid) { return; }

    this.store.dispatch(TodoActions.crearAction({ texto: this.txtInput.value }));

    this.txtInput.reset();
  }
}
