import { Action, createReducer, on } from '@ngrx/store';
import { setFilter, validsFilters } from './filter.actions';

export const initialstate: validsFilters = 'todos';

const _filterReducer = createReducer<validsFilters, Action>(
  initialstate,
  on(setFilter, (state, { filter }) => filter)
);

export function filterReducer(state, action) {
  return _filterReducer(state, action);
}
