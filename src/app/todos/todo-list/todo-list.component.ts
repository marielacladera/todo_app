import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { validsFilters } from 'src/app/filter/filter.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  public actualFilter$?: Observable<validsFilters>;
  public todos$?: Observable<Todo[]>;

  constructor(
    private _store: Store<AppState>,
    private _cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    this.todos$ = this._store.select('todos');
    this.actualFilter$ = this._store.select('filter');
    this._cdr.markForCheck();
  }
}
