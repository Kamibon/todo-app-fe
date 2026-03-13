import { Component, input, OnInit, inject } from '@angular/core';
import { Status, Todo } from '../../models/todo';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteTodo } from '../../state/todo.actions';

@Component({
  selector: 'app-todo-component',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo-component.component.html',
  styleUrl: './todo-component.component.css',
})
export class TodoComponentComponent {
  Status = Status;
  todo = input.required<Todo>();
  private readonly store = inject(Store);

  deleteThisTodo() {
    this.store.dispatch(deleteTodo({ id: this.todo().id }));
  }
}
