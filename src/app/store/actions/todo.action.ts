import { createAction, props } from "@ngrx/store";

export enum TodoActionTypes {
    CREAR = '[TODO] Crea Todo',
    TOGGLE = '[TODO] Toggle Todo',
    EDITAR = '[TODO] Editar Todo',
    BORRAR = '[TODO] Borrar Todo',
    TOGGLE_ALL = '[TODO] Toggle TodoAll',
    BORRAR_ALL = '[TODO] Borrar TodoAll',
}

export const crearAction = createAction('[TODO] Crea Todo', props<{ texto: string }>());
export const toggleAction = createAction(TodoActionTypes.TOGGLE, props<{ id: number }>());
export const editarAction = createAction(TodoActionTypes.EDITAR, props<{ id: number, texto: string }>());
export const borrarAction = createAction(TodoActionTypes.BORRAR, props<{ id: number }>());
export const togleAllAction = createAction(TodoActionTypes.TOGGLE_ALL, props<{ completado: boolean }>());
export const borrarAllAction = createAction(TodoActionTypes.BORRAR_ALL);