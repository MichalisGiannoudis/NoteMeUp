export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'scheduled' | 'not-started';
export type TaskType = 'todo' | 'meeting' | 'reminder' | 'task' | 'deadline' | 'bug' | 'feature' | 'issue';

export interface Task {
  id: string;
  type: TaskType;
  message: string;
  dueDate?: string | Date;
  userId: string;
  targetGroup?: string;
  status: TaskStatus;
  tags: string[];
  team?: string;
  priority: TaskPriority;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;

export const isTaskOverdue = (task: Task): boolean => {
  if (!task.dueDate) return false;
  
  const dueDate = new Date(task.dueDate);
  const now = new Date();
  
  return dueDate < now;
};

export const formatDueDate = (date?: string | Date): string => {
  if (!date) return 'No due date';
  
  const dueDate = new Date(date);
  
  return dueDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) + ' at ' + 
  dueDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'high':
      return 'red';
    case 'medium':
      return 'orange';
    case 'low':
      return 'green';
    default:
      return 'gray';
  }
};

export const getStatusDisplayText = (status: TaskStatus): string => {
  switch (status) {
    case 'in-progress':
      return 'In Progress';
    case 'not-started':
      return 'Not Started';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const filterTasksByStatus = (tasks: Task[], status: TaskStatus): Task[] => {
  return tasks.filter(task => task.status === status);
};

export const filterTasksByType = (tasks: Task[], type: TaskType): Task[] => {
  return tasks.filter(task => task.type === type);
};

export const sortTasksByDueDate = (tasks: Task[], ascending = true): Task[] => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate) return ascending ? 1 : -1;
    if (!b.dueDate) return ascending ? -1 : 1;
    
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    
    return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });
};
