import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState } from '../reducers/task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('task');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks,
);
