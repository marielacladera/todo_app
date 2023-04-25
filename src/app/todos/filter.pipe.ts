import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { validsFilters } from '../filter/filter.actions';

@Pipe({
  name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: validsFilters): Todo[] {
    switch(filter){
      case 'complete':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }

}
