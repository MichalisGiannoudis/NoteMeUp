export interface Todo {
  id: string;
  userId: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  type: 'personal' | 'work' | 'home' | 'errand' | 'other';
  isCompleted: boolean;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoType = 'personal' | 'work' | 'home' | 'errand' | 'other';

export interface TodoCreateInput {
  description: string;
  priority?: TodoPriority;
  dueDate?: Date;
  type?: TodoType;
  tags?: string[];
}

export interface TodoUpdateInput {
  id: string;
  description?: string;
  priority?: TodoPriority;
  dueDate?: Date | null;
  type?: TodoType;
  isCompleted?: boolean;
  tags?: string[];
}