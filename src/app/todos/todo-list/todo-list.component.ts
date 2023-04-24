import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { validsFilters } from 'src/app/filter/filter.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  public todos: Todo[];
  public actualFilter: validsFilters;

  constructor(
    private _store: Store<AppState>,
    private _cdr: ChangeDetectorRef
  ) {
    this.todos = [];
    this.actualFilter = 'todos';
  }

  public ngOnInit(): void {
    this._listTodos();
  }

  private _listTodos(): void {
    /*this._store.select('todos').subscribe((todos: Todo[]) => {
      this.todos = todos;
      this._cdr.markForCheck();
    });*/
    this._store.subscribe(({ todos, filter}) => {
      this.todos = todos;
      this.actualFilter = filter;
      this._cdr.markForCheck();
    });
  }
}
