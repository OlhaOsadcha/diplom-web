import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ButtonComponent } from 'components';
import { InputWrapperComponent } from '../../../../../../components/src/input/input-wrapper/input-wrapper.component';
import { TextFieldDirective } from '../../../../../../components/src/input/text-field/text-field.directive';
import { CheckboxComponent } from '../../../../../../components/src/input/checkbox/checkbox.component';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrl: 'income-detail.component.scss',
  standalone: true,
  imports: [
    CheckboxComponent,
    InputWrapperComponent,
    TextFieldDirective,
    ButtonComponent,
    ReactiveFormsModule,
  ],
})
export class IncomeDetailComponent implements OnInit {
  public incomeDetailForm!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public get showSpouse(): boolean {
    return this.incomeDetailForm.get('hasSpouse')?.value;
  }

  private initForm(): void {
    this.incomeDetailForm = this.fb.group({
      salary: [''],
      pension: [''],
      arf: [''],
      deposit: [''],
      other: [''],
      hasSpouse: [false],
      salarySpouse: [''],
      pensionSpouse: [''],
      arfSpouse: [''],
      depositSpouse: [''],
      otherSpouse: [''],
    });
  }
}
