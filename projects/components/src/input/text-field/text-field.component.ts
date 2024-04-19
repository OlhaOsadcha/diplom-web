import { Component, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'lib-text-field',
  template: ` <ng-container *ngTemplateOutlet="template"></ng-container>`,
  styleUrl: 'text-field.component.scss',
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class TextFieldComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public template!: TemplateRef<any>;
}
