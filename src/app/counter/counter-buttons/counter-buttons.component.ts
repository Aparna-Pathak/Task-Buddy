import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { decrement, increment, reset } from '../state/counter.actions';

import { CounterState } from '../state/counter.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class CounterButtonsComponent {
  constructor(@Inject(Store) private store: Store<{ counter: CounterState }>) {}

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
