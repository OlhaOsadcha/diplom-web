import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ObjectValues } from '../utils/typescript-utils';
import { NgTemplateOutlet } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';

export const LIB_BUTTON_TYPE = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
};

export type LibButtonType = ObjectValues<typeof LIB_BUTTON_TYPE>;

@Component({
  selector: 'lib-button',
  templateUrl: 'button.component.html',
  styleUrl: 'button.component.scss',
  standalone: true,
  imports: [MatTooltip, NgTemplateOutlet, MatButton, MatButtonModule],
})
export class ButtonComponent implements OnChanges {
  @Input() public isDisabled = false;
  @Input() public tooltipText = '';
  @Input() public type: LibButtonType = LIB_BUTTON_TYPE.primary;

  protected readonly LIB_BUTTON_TYPE = LIB_BUTTON_TYPE;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private disableClick = (e: any) => e.stopPropagation();

  constructor(private elementRef: ElementRef) {}

  public ngOnChanges(): void {
    if (this.isDisabled) {
      this.elementRef.nativeElement.addEventListener('click', this.disableClick, { capture: true });
    } else {
      this.elementRef.nativeElement.removeEventListener('click', this.disableClick, {
        capture: true,
      });
    }
  }
}
