import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoAddComponent {

  public descriptionFormControl: FormControl;

  constructor(private _store: Store<AppState>) {
    this.descriptionFormControl = new FormControl('', Validators.required);
  }

  public add(): void {
    if (this.descriptionFormControl.invalid) {
      return;
    }
    this._store.dispatch(
      actions.create({ texto: this.descriptionFormControl.value })
    );
    this.descriptionFormControl.reset();
  }

}
