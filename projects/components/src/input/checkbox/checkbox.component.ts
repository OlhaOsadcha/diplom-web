import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { TextComponent } from 'components';

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: 'checkbox.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCheckbox, TextComponent],
})
export class CheckboxComponent implements ControlValueAccessor {
  public _value: boolean | undefined;
  @Input() public set value(value: boolean) {
    this.checkValueInputError();
    this._value = value;
  }
  @Input() public indeterminate = false;
  @Input() public label = '';
  @Input() public assistiveText = '';
  @Input() public disabled = false;

  @Output() public valueChange = new EventEmitter<boolean>();
  @Output() public touched = new EventEmitter<boolean>();
  @Output() public blur = new EventEmitter<boolean>();

  private onChange!: (value: boolean) => void;
  private onTouched!: () => void;

  constructor(
    @Optional() @Self() private ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public writeValue(value: boolean): void {
    this._value = value;
    this.cdr.markForCheck();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onCheck(changeEvent: MatCheckboxChange): void {
    this.valueChange.emit(changeEvent.checked);
    this.blur.emit();
    this._value = changeEvent.checked;
    if (this.ngControl) {
      this.onChange(changeEvent.checked);
      this.onTouched();
    } else {
      this.touched.emit();
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  private checkValueInputError(): void {
    if (this.ngControl) {
      throw new Error('Do not use value input binding together with a FormControl');
    }
  }
}
