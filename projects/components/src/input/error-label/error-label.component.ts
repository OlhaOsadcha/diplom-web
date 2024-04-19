import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TextComponent } from 'components';

@Component({
  selector: 'lib-error-label',
  templateUrl: './error-label.component.html',
  styleUrl: 'error-label.component.scss',
  standalone: true,
  imports: [MatIcon, TextComponent],
})
export class ErrorLabelComponent {
  @Input() public errors: string[] = [];
}
