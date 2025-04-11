import { createSelector } from "@ngrx/store";
import { ApplicationState } from "../application-state";

export const selectTodo = (state: ApplicationState) => state.todo;



export const selectTotalPendientes = createSelector(
    selectTodo,
    (state) => state.filter( (todo:any) => !todo.completado ).length
)