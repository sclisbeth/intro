import { createReducer, on } from '@ngrx/store';
import { TodoActions } from '../actions';
import { Todo } from 'src/app/core/models/todo.model';

export const todoFeatureKey = 'todo';

export interface TodoState {
    list: any,
}

export const initialState: Todo[] = [
    new Todo('tarea 1'),
    new Todo('tarea 2'),
    new Todo('tarea 3'),
    new Todo('tarea 4'),
]


export const todoReducer = createReducer(
    initialState,
    on(TodoActions.crearAction, (state, { texto }) => [...state, new Todo(texto)]),

    on(TodoActions.borrarAllAction, state => state.filter(todo => !todo.completado)),

    on(TodoActions.borrarAction, (state, { id }) => state.filter(todo => todo.id !== id)),

    on(TodoActions.togleAllAction, (state, { completado }) => state.map(todo => {

        return {
            ...todo,
            completado: completado
        }

    })),

    on(TodoActions.toggleAction, (state, { id }) => {

        return state.map(todo => {

            if (todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }

        });
    }),

    on(TodoActions.editarAction, (state, { id, texto }) => {

        return state.map(todo => {

            if (todo.id === id) {
                return {
                    ...todo,
                    texto: texto
                }
            } else {
                return todo;
            }

        });
    }),

);