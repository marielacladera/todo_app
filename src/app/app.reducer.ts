import { ActionReducerMap } from "@ngrx/store";
import { Todo } from "./todos/models/todo.model";
import { todoReducer } from "./todos/todo.reducer";
import { validsFilters } from "./filter/filter.actions";
import { filterReducer } from "./filter/filter.reducer";

export interface AppState{
  todos: Todo[],
  filter: validsFilters,
}

export const appReducer: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filter: filterReducer
}
