import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoComponentComponent } from '../../components/todo-component/todo-component.component';
import * as TodoActions from '../../state/todo.actions';
import { CommonModule } from '@angular/common';
import { Priority, Status, Todo } from '../../models/todo';
import { TodosService } from '../../services/todo-service.service';
import * as TodoSelectors from '../../state/todo.selectors';
import { HttpTestingController } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  let todoService: TodosService;

  const todos: Todo[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'Description 1',
      status: Status.COMPLETED,
      priority: Priority.HIGH,
      expirationDate: new Date(),
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'Description 2',
      status: Status.EXPIRED,
      priority: Priority.LOW,
      expirationDate: new Date(),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, HomeComponent, StoreModule.forRoot({})],
      providers: [
        provideMockStore({
          initialState: {
            todos: {
              todos: todos,
              loading: false,
              error: null,
            },
          },
        }),
        TodosService,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    todoService = TestBed.inject(TodosService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTodos action on init', async () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(TodoActions.loadTodos());
  });

  it('should select all todos from store', () => {
    store.overrideSelector(TodoSelectors.selectAllTodos, todos);
    component.todos$.subscribe((todosFromStore) => {
      expect(todosFromStore).toEqual(todos);
    });
  });

  it('should open the modal when handleClick is called', () => {
    expect(component.openModal()).toBe(false);

    component.handleClick();

    expect(component.openModal()).toBe(true);
  });

  it('should dispatch updateTodo action when toggleComplete is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const todo = todos[0];
    component.toggleComplete(todo);
    expect(dispatchSpy).toHaveBeenCalledWith(
      TodoActions.updateTodo({
        todo: { ...todo, status: Status.COMPLETED },
      }),
    );
  });

  it('should dispatch deleteTodo action when deleteTodo is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const todoId = todos[0].id;
    component.deleteTodo(todoId);
    expect(dispatchSpy).toHaveBeenCalledWith(
      TodoActions.deleteTodo({ id: todoId }),
    );
  });
});
