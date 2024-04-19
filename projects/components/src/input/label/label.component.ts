import { Component, Input } from '@angular/core';
import { TextComponent } from 'components';

@Component({
  selector: 'lib-label',
  templateUrl: './label.component.html',
  styleUrl: 'label.component.scss',
  standalone: true,
  imports: [TextComponent],
})
export class LabelComponent {
  @Input() public label: string = '';
  @Input() public optional: boolean | undefined;
  @Input() public bold: boolean = true;

  public get labelTitle(): string {
    return this.optional ? this.label + ' (optional)' : this.label;
  }
}
