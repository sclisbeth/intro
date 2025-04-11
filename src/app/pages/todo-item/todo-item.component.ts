import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Todo } from 'src/app/core/models/todo.model';
import { TodoActions } from 'src/app/store/actions';
import { ApplicationState } from 'src/app/store/application-state';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  chkCompletado!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit(): void {

    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(TodoActions.toggleAction({ id: this.todo.id }));
    });

  }

  editar() {

    this.editando = true;
    this.txtInput.setValue(this.todo.texto);

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);

  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) { return; }
    if (this.txtInput.value === this.todo.texto) { return; }


    this.store.dispatch(
      TodoActions.editarAction({
        id: this.todo.id,
        texto: this.txtInput.value
      })
    );
  }

  borrar() {

    this.store.dispatch(TodoActions.borrarAction({ id: this.todo.id }));

  }

}
