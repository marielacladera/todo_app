import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPageComponent {

  public complete: boolean;

  constructor(
    private _store: Store<AppState>
  ) {
    this.complete = false;
  }

  public toggleAll(): void {
    this.complete = !this.complete;
    this._store.dispatch(actions.toggleAll({ complete: this.complete}));
  }
}
