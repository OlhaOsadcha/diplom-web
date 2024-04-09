import { Component, Input } from '@angular/core';
import { ChipComponent, ChipConfig } from 'components';
import { TextComponent } from 'components';

@Component({
  selector: 'app-card-header',
  templateUrl: 'card-header.component.html',
  styleUrl: 'card-header.component.scss',
  standalone: true,
  imports: [ChipComponent, TextComponent],
})
export class CardHeaderComponent {
  @Input() public title: string | undefined;
  @Input() public chipConfig: ChipConfig | undefined;
}
