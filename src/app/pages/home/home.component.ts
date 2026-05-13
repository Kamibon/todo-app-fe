import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Modal } from '../../components/modal/modal';
import { TodoComponentComponent } from '../../components/todo-component/todo-component.component';
import { CreateTodoRequest, Priority, Status, Todo } from '../../models/todo';
import { TodosService } from '../../services/todo-service.service';
import * as TodoActions from '../../state/todo.actions';
import * as TodoSelectors from '../../state/todo.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoComponentComponent, CommonModule, Modal],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  private readonly store = inject(Store);
  private readonly todoService = inject(TodosService);

  openModal = signal<boolean>(false);

  constructor() {
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
    this.loading$ = this.store.select(TodoSelectors.selectLoading);
    this.error$ = this.store.select(TodoSelectors.selectError);
  }
  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  requestTodo: CreateTodoRequest = {
    title: 'Titolo compl',
    description: 'Descrizione di questo todo',
    expirationDate: new Date(),
    status: Status.COMPLETED,
    priority: Priority.LOW,
  };

  handleClick() {
    this.openModal.set(true);
  }

  toggleComplete(todo: Todo) {
    this.store.dispatch(
      TodoActions.updateTodo({ todo: { ...todo, status: Status.COMPLETED } }),
    );
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }
}
