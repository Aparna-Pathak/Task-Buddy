import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { counterReducer } from './counter/state/counter.reducer';
import { taskReducer } from './task-scheduler/store/reducers/task.reducer';
import { TaskEffects } from './task-scheduler/store/effects/task.effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideEffects([TaskEffects]),
    provideStore({ counter: counterReducer, task: taskReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideAnimations(),
  ],
};
