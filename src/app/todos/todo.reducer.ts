import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { create, deleteAllComplete, edit, remove, toggle, toggleAll } from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Limpiar la casa')
];

const _todoReducer = createReducer(
  initialState,
  on(create, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle,(state, { id }) => {
    return state.map( todo => {
      if(todo.id === id){
        return {
          ...todo,
          completed: !todo.completed
        }
      }else{
        return todo;
      }
    })
  }),
  on(edit, (state, { id, text }) => {
    return state.map( todo => {
      if(todo.id === id){
        return {
          ...todo,
          text: text
        }
      }else{
        return todo;
      }
    })
  }),
  on(remove, (state, { id }) => {
    return state.filter(todo => todo.id !== id)
  }),
  on(toggleAll, (state, { complete }) => {
    return state.map( todo => {
        return {
          ...todo,
          completed: complete
        }
    })
  }),
  on(deleteAllComplete, (state) => {
    return state.filter(todo => !todo.completed)
  }),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
