import { createAction, props } from '@ngrx/store';

export type validsFilters = 'todos' | 'complete' | 'pending';
const ACTION_SET_FILTERS = '[Filter] Set Filter';

export const setFilter = createAction(
  ACTION_SET_FILTERS,
  props<{ filter: validsFilters }>()
);
