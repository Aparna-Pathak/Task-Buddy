import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'task-buddy-app';
}
