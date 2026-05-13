import { Component, input, OnInit, inject, computed } from '@angular/core';
import { Priority, Status, Todo } from '../../models/todo';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteTodo, updateTodo } from '../../state/todo.actions';
import { clipWord } from '../../utils/utils';

@Component({
  selector: 'app-todo-component',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo-component.component.html',
  styleUrl: './todo-component.component.css',
})
export class TodoComponentComponent {
  Status = Status;
  Priority = Priority;
  todo = input.required<Todo>();
  private readonly store = inject(Store);

  clippedTitle = computed(() => clipWord(this.todo().title, 15));
  todoCompleted = computed(() => ({
    ...this.todo(),
    status: Status.COMPLETED,
  }));

  deleteThisTodo() {
    this.store.dispatch(deleteTodo({ id: this.todo().id }));
  }

  updateThisTodo(updatedTodo: Todo) {
    this.store.dispatch(updateTodo({ todo: updatedTodo }));
  }
}
