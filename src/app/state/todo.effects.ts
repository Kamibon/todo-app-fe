import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { TodosService } from '../services/todo-service.service';
import { Store } from '@ngrx/store';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private todoService: TodosService,
  ) {}

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      mergeMap((action) =>
        this.todoService.addTodo(action.todo).pipe(
          map((todo) => {
            return TodoActions.addTodoSuccess({ todo });
          }),
          catchError((error) => of(TodoActions.addTodoFailure({ error }))),
        ),
      ),
      tap(() => {
        this.store.dispatch(TodoActions.loadTodos());
      }),
    ),
  );

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => of(TodoActions.loadTodosFailure({ error }))),
        ),
      ),
    ),
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      switchMap((action) =>
        this.todoService.deleteTodo(action.id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id: action.id })),
          catchError((error) => of(TodoActions.deleteTodoFailure({ error }))),
        ),
      ),
      tap(() => {
        this.store.dispatch(TodoActions.loadTodos());
      }),
    ),
  );
}
