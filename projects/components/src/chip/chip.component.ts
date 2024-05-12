import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LIB_COLOR, LibColor } from '../_theme/color.type';

export interface ChipConfig {
  displayString: string;
  color: LibColor;
}

@Component({
  selector: 'lib-chip',
  templateUrl: 'chip.component.html',
  styleUrl: 'chip.component.scss',
  standalone: true,
  imports: [TranslateModule],
})
export class ChipComponent implements OnInit {
  public chipColor: LibColor | undefined;
  public displayString: string = '';

  @Input() set config(chipConfig: ChipConfig) {
    this.chipColor = chipConfig.color;
    this.displayString = chipConfig.displayString;
  }

  @Input() public set color(color: LibColor) {
    this.chipColor = color;
  }

  @Input() public set label(displayString: string) {
    this.displayString = displayString;
  }

  @HostBinding('class.chip-color-accent-blue') accentBlue: boolean | undefined;
  @HostBinding('class.chip-color-accent-green') accentGreen: boolean | undefined;
  @HostBinding('class.chip-color-accent-red') accentRed: boolean | undefined;
  @HostBinding('class.chip-color-accent-yellow') accentYellow: boolean | undefined;
  @HostBinding('class.chip-color-primary-blue') primaryBlue: boolean | undefined;
  @HostBinding('class.chip-color-primary-yellow') primaryYellow: boolean | undefined;
  @HostBinding('class.chip-color-secondary-grey') secondaryGrey: boolean | undefined;

  public ngOnInit(): void {
    this.accentBlue = this.chipColor === LIB_COLOR.accentBlue;
    this.accentGreen = this.chipColor === LIB_COLOR.accentGreen;
    this.accentRed = this.chipColor === LIB_COLOR.accentRed;
    this.accentYellow = this.chipColor === LIB_COLOR.accentYellow;
    this.primaryBlue = this.chipColor === LIB_COLOR.primaryBlue;
    this.primaryYellow = this.chipColor === LIB_COLOR.primaryYellow;
    this.secondaryGrey = this.chipColor === LIB_COLOR.secondaryGrey;
  }
}
