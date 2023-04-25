import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filter/filter.actions';
import { deleteAllComplete } from '../todo.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFooterComponent implements OnInit {
  public filters: actions.validsFilters[];
  public pending: number;

  public actualFilter$?: Observable<actions.validsFilters>;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _store: Store<AppState>
  ) {
    this.filters = ['todos', 'complete', 'pending'];
    this.pending = 0;
  }

  public ngOnInit(): void {
    this._initialize();
  }

  private _initialize() {
    this._countPendingTodo();
    this._loadActualFilter();
  }

  public changeFilter(filter: actions.validsFilters) {
    this._store.dispatch(actions.setFilter({ filter: filter }));
  }

  public clearComplete(): void {
    this._store.dispatch(deleteAllComplete());
  }

  private _loadActualFilter(): void {
    this.actualFilter$ = this._store.select('filter');
  }

  private _countPendingTodo(): void {
    this._store.select('todos').subscribe((state) => {
      this.pending = state.filter((todo) => !todo.completed).length;
      this._cdr.markForCheck();
    });
  }
}
