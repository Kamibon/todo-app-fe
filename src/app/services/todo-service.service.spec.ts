import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Todo, CreateTodoRequest, Status, Priority } from '../models/todo';
import { TodosService } from './todo-service.service';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;
  const apiUrl = '/api/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TodosService, provideHttpClientTesting()],
    });

    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todos successfully', () => {
    const mockTodos: Todo[] = [
      {
        id: 1,
        title: 'Test Todo 1',
        description: 'Description 1',
        status: Status.COMPLETED,
        expirationDate: new Date(),
        priority: Priority.LOW,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Test Todo 2',
        description: 'Description 2',
        status: Status.EXPIRED,
        expirationDate: new Date(),
        priority: Priority.MEDIUM,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should add a new todo', () => {
    const newTodo: CreateTodoRequest = {
      title: 'New Todo',
      description: 'New Todo Description',
      expirationDate: new Date(),
      status: Status.INCOMPLETE,
      priority: Priority.LOW,
    };
    const mockTodo: Todo = {
      id: 3,
      title: 'New Todo',
      description: 'New Todo Description',
      status: Status.INCOMPLETE,
      expirationDate: new Date(),
      priority: Priority.LOW,
      createdAt:new Date(),
      updatedAt: new Date()
    };

    service.addTodo(newTodo).subscribe((todo) => {
      expect(todo).toEqual(mockTodo);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush(mockTodo);
  });

  it('should delete a todo by id', () => {
    const todoId = 1;

    service.deleteTodo(todoId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
