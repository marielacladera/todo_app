import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,  } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filter/filter.actions';
import { deleteAllComplete } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFooterComponent implements OnInit {
  public actualFilter: actions.validsFilters;
  public filters: actions.validsFilters[];

  public earring: number;

  constructor(
    private _store: Store<AppState>,
    private _cdr: ChangeDetectorRef
  ) {
    this.filters = ['todos', 'complete', 'earring'];
    this.actualFilter = 'todos';
    this.earring = 0
  }

  public ngOnInit(): void {
    this._initialize()
  }

  private _initialize() {
    this._store.subscribe(state => {
      this.actualFilter = state.filter;
      this.earring = state.todos.filter(todo => !todo.completed).length;
      this._cdr.markForCheck();
    });
  }

  public changeFilter(filter: actions.validsFilters) {
    this._store.dispatch(actions.setFilter({filter: filter}));
  }

  public clearComplete(): void{
    this._store.dispatch(deleteAllComplete());
  }
}
