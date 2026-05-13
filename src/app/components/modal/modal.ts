import { Component, inject, input, output, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { Store } from '@ngrx/store';
import * as TodoActions from '../../state/todo.actions';

@Component({
  selector: 'app-modal',
  imports: [FormField, FormRoot],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  isOpen = input.required<boolean>();
  closeModal = output();
  store = inject(Store);

  readonly INITIAL_MODEL = {
    title: '',
    description: '',
    expirationDate: new Date(),
    status: 'INCOMPLETE',
    priority: 'LOW',
  };

  todoModel = signal({ ...this.INITIAL_MODEL });

  todoForm = form(this.todoModel, {
    submission: {
      action: async (f) => {
        this.onSubmit();
        f().reset({ ...this.INITIAL_MODEL });
      },
    },
  });
  onSubmit() {
    const formData = this.todoModel();
    //@ts-ignore
    this.store.dispatch(TodoActions.addTodo({ todo: formData }));
  }
}
