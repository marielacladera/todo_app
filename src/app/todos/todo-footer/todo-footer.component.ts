import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filter/filter.actions';
import { deleteAllComplete } from '../todo.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFooterComponent implements OnInit, OnDestroy {

  public filters: actions.validsFilters[];
  public pending: number;

  public actualFilter$?: Observable<actions.validsFilters>;
  private _unSubscribeSubject: Subject<void>;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _store: Store<AppState>
  ) {
    this._unSubscribeSubject = new Subject<void>();
    this.filters = ['todos', 'complete', 'pending'];
    this.pending = 0;
  }

  public ngOnInit(): void {
    this._initialize();
  }

  ngOnDestroy(): void {
    this._finalize();
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
    this._store.select('todos').pipe(takeUntil(this._unSubscribeSubject)).subscribe((state) => {
      this.pending = state.filter((todo) => !todo.completed).length;
      this._cdr.markForCheck();
    });
  }

  private _finalize(): void {
    this._unSubscribeSubject.next();
    this._unSubscribeSubject.complete();
  }

}
