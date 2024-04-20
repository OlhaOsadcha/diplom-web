import { Component } from '@angular/core';
import { InputWrapperComponent } from '../../../../../../components/src/input/input-wrapper/input-wrapper.component';
import { TextFieldDirective } from '../../../../../../components/src/input/text-field/text-field.directive';
import { CheckboxComponent } from '../../../../../../components/src/input/checkbox/checkbox.component';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrl: 'income-detail.component.scss',
  standalone: true,
  imports: [CheckboxComponent, InputWrapperComponent, TextFieldDirective],
})
export class IncomeDetailComponent {}
