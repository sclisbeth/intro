import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions } from 'src/app/store/actions';
import { ApplicationState } from 'src/app/store/application-state';
import { TodoSelector } from 'src/app/store/selectors';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent {

  // filtroActual: actions.filtrosValidos = 'todos';
  // filtros: actions.filtrosValidos[] = ['todos','completados','pendientes'];

  pendientes$= this.store.select(TodoSelector.selectTotalPendientes);

  constructor( private store: Store<ApplicationState> ) { }

  ngOnInit(): void {

    // this.store.select('filtro')
    //   .subscribe( filtro => this.filtroActual = filtro );
    // this.store.subscribe( (state:any) => {

    //   this.pendientes   = state.todos.filter( (todo:any) => !todo.completado ).length;

    // });

  }

  // cambiarFiltro( filtro: actions.filtrosValidos ) {

  //   this.store.dispatch( actions.setFiltro({ filtro }) );

  // }

  limpiarCompletados() {

    this.store.dispatch( TodoActions.borrarAllAction() )

  }

}
