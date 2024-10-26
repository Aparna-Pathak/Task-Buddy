import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import {
  addTask,
  deleteTask,
  editTask,
  saveTask,
} from '../store/actions/task.actions';
import { TaskState } from '../store/reducers/task.reducer';
import { selectAllTasks } from '../store/selectors/task.selector';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-task-scheduler',
  templateUrl: './task-scheduler.component.html',
  styleUrls: ['./task-scheduler.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class TaskSchedulerComponent {
  tasks$: Observable<Task[]>;
  newTaskTitle = '';
  newTaskDate!: Date | null;
  editingTask: Task | null = null;

  constructor(@Inject(Store) private store: Store<{ task: TaskState }>) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  addTask() {
    if (this.newTaskTitle.trim().length && this.newTaskDate) {
      const newTask: Task = {
        id: Date.now(),
        title: this.newTaskTitle,
        date: this.newTaskDate.toISOString(),
        isEditing: false,
      };
      this.store.dispatch(addTask({ task: newTask }));
      this.newTaskTitle = '';
      this.newTaskDate = null;
    }
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
    this.store.dispatch(editTask({ task: { ...task, isEditing: true } }));
  }

  saveTask() {
    if (this.editingTask) {
      this.store.dispatch(saveTask({ task: this.editingTask }));
      this.editingTask = null;
    }
  }

  deleteTask(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }
}
