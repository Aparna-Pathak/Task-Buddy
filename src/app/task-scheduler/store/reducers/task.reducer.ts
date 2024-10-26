import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../../model/task';
import * as TaskActions from '../actions/task.actions';

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  on(TaskActions.deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  })),

  on(TaskActions.editTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === task.id ? { ...t, isEditing: true } : t,
    ),
  })),

  on(TaskActions.saveTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === task.id ? { ...task, isEditing: false } : t,
    ),
  })),
);

export function reducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}
