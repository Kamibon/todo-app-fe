export enum Status {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
}

export enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}

export interface Todo {
  id: number;

  title: string;

  description: string;

  expirationDate: Date;

  status: Status;

  priority: Priority;
}

export interface CreateTodoRequest {
  title: string;

  description: string;

  expirationDate: Date;

  status: Status;

  priority: Priority;
}
