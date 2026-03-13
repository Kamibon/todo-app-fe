import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';
import { Status } from '../models/todo';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos,
);

export const selectLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading,
);

export const selectError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error,
);

export const selectCompletedTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => todo.status === Status.COMPLETED),
);
