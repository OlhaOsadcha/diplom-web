import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
} from '@angular/core';
import {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { Overlay } from '@angular/cdk/overlay';
import { scrollFactory } from '../../scroll-factory';
import { InputInterface } from '../input.interface';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export interface OptionItem {
  value: string;
  label: string;
}

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  standalone: true,
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: { overlayPanelClass: 'custom-cdk-overlay-select-panel' },
    },
    {
      provide: MAT_SELECT_SCROLL_STRATEGY,
      useFactory: scrollFactory,
      deps: [Overlay],
    },
  ],
  imports: [MatSelect, MatOption],
})
export class SelectComponent implements InputInterface, ControlValueAccessor {
  @Input() public options: OptionItem[] | undefined;
  @Input() public placeholder = 'Please select';
  @Input() public multiple = false;

  public _value: string | string[] | undefined;
  @Input() public set value(value: string | string[]) {
    this.checkForWrongInputParameterUsage('value');
    this._value = value;
  }

  public _disabled = false;
  @Input() public set disabled(disabled: boolean) {
    this.checkForWrongInputParameterUsage('disabled');
    this._disabled = disabled;
  }

  @Output() public valueChange = new EventEmitter<string | string[]>();
  @Output() public touched = new EventEmitter<boolean>();
  @Output() public blur = new EventEmitter<boolean>();
  @Output() public focus = new EventEmitter<void>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onValueChangeFn: (value: any) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onTouchedFn: () => any = () => {};

  constructor(
    @Optional() @Self() private ngControl: NgControl,
    private changeDetector: ChangeDetectorRef
  ) {
    if (ngControl !== null) {
      ngControl.valueAccessor = this;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public writeValue(value: any): void {
    this._value = value;
    this.changeDetector.markForCheck();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onValueChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.changeDetector.markForCheck();
  }

  public onValueChange(value: string | string[]): void {
    if (this.ngControl !== null) {
      this.onValueChangeFn(value);
    } else {
      this.valueChange.emit(value);
    }
  }

  public onTouched(): void {
    this.blur.emit();
    if (this.ngControl !== null) {
      this.onTouchedFn();
    } else {
      this.touched.emit(true);
    }
  }

  private checkForWrongInputParameterUsage(paramName: string) {
    if (this.ngControl !== null) {
      throw new Error(`Don't use [${paramName}] input binding together with a FormControl`);
    }
  }
}
