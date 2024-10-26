import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../counter/counter/counter.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskSchedulerComponent } from '../task-scheduler/task-scheduler/task-scheduler.component';

export interface Tile {
  color?: string;
  cols: number;
  rows: number;
  text: string;
  template: string;
  image?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CounterComponent,
    TaskSchedulerComponent,
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    FormsModule,
    MatSlideToggleModule,
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  tiles: Tile[] = [
    {
      text: 'One',
      cols: 4,
      rows: 1,
      color: '#D0E6D8',
      template: 'templateOne',
    },

    {
      text: 'Two',
      cols: 4,
      rows: 4,
      color: '#D0E6D8',
      template: 'templateTwo',
    },
    {
      text: 'Three',
      cols: 4,
      rows: 6,
      color: '#F4B6C2',
      template: 'templateThree',
    },
    {
      text: 'Four',
      cols: 2,
      rows: 6,
      color: '#A4D8E1',
      template: 'templateFour',
    },
    {
      text: 'Five',
      cols: 2,
      rows: 6,
      color: '#f8f3e8',
      template: 'templateFive',
    },
  ];

  checked = false;
  disabled = false;
  currentSlide = 0;
  intervalId!: number;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.wallpapers.length;
    }, 5000);
  }

  wallpapers = [
    {
      image: 'assets/wallpaper1.jpg',
      quote:
        'The only limit to our realization of tomorrow is our doubts of today.',
    },
    {
      image: 'assets/wallpaper2.jpg',
      quote: 'Do something today that your future self will thank you for.',
    },
    {
      image: 'assets/wallpaper3.jpg',
      quote: 'Believe you can and you are halfway there.',
    },
    {
      image: 'assets/wallpaper4.webp',
      quote:
        'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    },
  ];
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
