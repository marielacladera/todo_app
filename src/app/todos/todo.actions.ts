import { createAction, props } from '@ngrx/store';


const ACTION_EDIT_TODO: string = '[Todo] Edit Todo';
const ACTION_CREATE_TODO: string = '[Todo] Crea Todo';
const ACTION_TOOGLE_TODO: string = '[Todo] Toggle Todo';
const ACTION_DELETE_TODO: string = '[Todo] Delete Todo';
const ACTION_COMPLETE_ALL_TODO: string = '[Todo] Complete Todo';
const ACTION_DELETE_COMPLETE_ALL_TODO: string = '[Todo] Delete all complete Todo'

export const deleteAllComplete = createAction(
  ACTION_DELETE_COMPLETE_ALL_TODO
);

export const create = createAction(
  ACTION_CREATE_TODO,
  props<{ texto: string }>()
);

export const toggle = createAction(
  ACTION_TOOGLE_TODO,
  props<{ id: number }>()
);

export const edit = createAction(
  ACTION_EDIT_TODO,
  props<{ id: number, text: string }>()
);

export const remove = createAction(
  ACTION_DELETE_TODO,
  props<{ id: number }>()
);

export const toggleAll = createAction(
  ACTION_COMPLETE_ALL_TODO,
  props<{complete: boolean}>()
);
