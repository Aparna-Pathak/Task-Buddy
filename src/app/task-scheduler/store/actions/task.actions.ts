// import { createAction, props } from '@ngrx/store';
// import { Task } from '../../model/task';

// export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

// export const deleteTask = createAction(
//   '[Task] Delete Task',
//   props<{ id: number }>(),
// );

// export const editTask = createAction(
//   '[Task] Edit Task',
//   props<{ task: Task }>(),
// );

// export const saveTask = createAction(
//   '[Task] Save Task',
//   props<{ task: Task }>(),
// );

import { createAction, props } from '@ngrx/store';
import { Task } from '../../model/task';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: number }>(),
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ task: Task }>(),
);

export const saveTask = createAction(
  '[Task] Save Task',
  props<{ task: Task }>(),
);
