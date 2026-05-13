import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CreateTodoRequest, Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private readonly http = inject(HttpClient);
  private apiUrl = '/api/todos';
  getTodos(): Observable<Array<Todo>> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(map((todos) => todos || []));
  }

  addTodo(todo: CreateTodoRequest): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl + '/' + todo.id, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}
