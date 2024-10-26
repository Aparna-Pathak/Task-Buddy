export interface Task {
  id: number;
  title: string;
  isEditing?: boolean;
  date: string;
}

export interface TaskState {
  tasks: Task[];
}
