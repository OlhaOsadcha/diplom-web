import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShellComponent } from 'components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
