import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico?: ElementRef;

  public checkFormControl: FormControl;
  public descriptionFormControl: FormControl;
  public editing: boolean;

  constructor(private _store: Store<AppState>) {
    this.checkFormControl = new FormControl(false);
    this.descriptionFormControl = new FormControl('');
    this.editing = false;
  }

  public ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    this._startForm();
    this._changeState();
  }

  private _startForm(): void {
    if (this.todo) {
      this.checkFormControl = new FormControl(this.todo.completed);
      this.descriptionFormControl = new FormControl(
        this.todo.text,
        Validators.required
      );
    }
  }

  private _changeState(): void {
    this.checkFormControl.valueChanges.subscribe(() => {
      this._store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }

  public editTodo(): void {
    this.editing = true;
    this.descriptionFormControl.setValue(this.todo.text);
    setTimeout(() => {
      this.txtInputFisico?.nativeElement.focus();
    }, 1);
  }

  public finishEditing(): void {
    this.editing = false;
    if (this.descriptionFormControl.invalid) {
      return;
    }
    if (this.descriptionFormControl.value === this.todo.text) {
      return;
    }
    this._editTextTodo();
  }

  private _editTextTodo(): void {
    this._store.dispatch(
      actions.edit({
        id: this.todo.id,
        text: this.descriptionFormControl.value,
      })
    );
  }

  public removeTodo(): void {
    this._store.dispatch(
      actions.remove({
        id: this.todo.id,
      })
    );
  }
}
