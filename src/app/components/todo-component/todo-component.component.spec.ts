import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponentComponent } from './todo-component.component';
import { Priority, Status, Todo } from '../../models/todo';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { deleteTodo } from '../../state/todo.actions';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

describe('TodoComponentComponent', () => {
  let component: TodoComponentComponent;
  let fixture: ComponentFixture<TodoComponentComponent>;
  let store: MockStore;

  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    status: Status.INCOMPLETE,
    priority: Priority.HIGH,
    expirationDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponentComponent, StoreModule.forRoot({})],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponentComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.componentRef.setInput('todo', mockTodo);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Status enum available', () => {
    expect(component.Status).toEqual(Status);
  });

  it('should dispatch deleteTodo action with correct id', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.deleteThisTodo();

    expect(dispatchSpy).toHaveBeenCalledWith(deleteTodo({ id: mockTodo.id }));
  });
});
