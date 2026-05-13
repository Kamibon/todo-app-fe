export enum Status {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Todo {
  id: number;

  title: string;

  description: string;

  expirationDate: Date;

  status: Status;

  priority: Priority;

  createdAt: Date;

  updatedAt: Date;
}

export type CreateTodoRequest = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
