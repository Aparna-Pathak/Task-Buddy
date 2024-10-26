import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CounterComponent } from './counter/counter/counter.component';
import { TaskSchedulerComponent } from './task-scheduler/task-scheduler/task-scheduler.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task', component: TaskSchedulerComponent },
  { path: 'counter', component: CounterComponent },
  { path: '**', redirectTo: 'dashboard' },
];
