import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ShellService } from './shell.service';

@Component({
  selector: 'app-shell',
  templateUrl: 'shell.component.html',
  styleUrl: 'shell.component.scss',
  standalone: true,
  imports: [HeaderComponent],
})
export class ShellComponent {
  constructor(private shellService: ShellService) {}
}
