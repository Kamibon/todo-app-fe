import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo } from '../models/todo';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: any;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todosReducer = createReducer(
  initialState,

  on(TodoActions.loadTodos, (state) => ({ ...state, loading: true })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    loading: false,
    todos,
  })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(TodoActions.addTodoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(TodoActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  })),
  on(TodoActions.updateTodoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== Number(id)),
  })),
  on(TodoActions.deleteTodoFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
