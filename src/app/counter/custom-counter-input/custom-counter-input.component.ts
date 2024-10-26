import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { changeStateName, customIncrement } from '../state/counter.actions';
import { getStateName } from '../state/counter.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-counter-input',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.scss',
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  stateName$!: Observable<string>;

  constructor(private store: Store<{ counter: CounterState }>) {}

  ngOnInit(): void {
    this.stateName$ = this.store.select(getStateName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value }));
  }

  onChangeStateName() {
    this.store.dispatch(changeStateName());
  }
}
