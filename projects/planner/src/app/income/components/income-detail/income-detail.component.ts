import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { InputWrapperComponent } from '../../../../../../components/src/input/input-wrapper/input-wrapper.component';
import { CheckboxComponent } from '../../../../../../components/src/input/checkbox/checkbox.component';
import { ButtonComponent } from 'components';
import { TextFieldDirective } from '../../../../../../components/src/input/text-field/text-field.directive';
import { IncomeModel } from '../../../shared/models/income.model';

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
  @Output() public cancel = new EventEmitter<void>();
  @Output() public incomeDetailChange = new EventEmitter<IncomeModel>();

  public incomeDetailForm!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {}

  public ngOnInit(): void {
    this.initForm();

    this.incomeDetailForm.get('hasSpouse')?.valueChanges.subscribe({
      next: value => {
        if (value === false) {
          this.incomeDetailForm.get('salarySpouse')?.setValue('');
          this.incomeDetailForm.get('pensionSpouse')?.setValue('');
          this.incomeDetailForm.get('depositSpouse')?.setValue('');
          this.incomeDetailForm.get('otherSpouse')?.setValue('');
        }
      },
    });
  }

  public get isSaveDisabled(): boolean {
    return this.myIncomeTotal + this.incomeSpouseTotal <= 0;
  }

  public get incomeSpouseTotal(): number {
    return (
      Number(this.incomeDetailForm.get('salarySpouse')?.value) +
      Number(this.incomeDetailForm.get('pensionSpouse')?.value) +
      Number(this.incomeDetailForm.get('depositSpouse')?.value) +
      Number(this.incomeDetailForm.get('otherSpouse')?.value)
    );
  }

  public get incomeSpouse(): string {
    return this.incomeSpouseTotal ? ` ${this.incomeSpouseTotal}` : '';
  }

  public get myIncomeTotal(): number {
    return (
      Number(this.incomeDetailForm.get('salary')?.value) +
      Number(this.incomeDetailForm.get('pension')?.value) +
      Number(this.incomeDetailForm.get('deposit')?.value) +
      Number(this.incomeDetailForm.get('other')?.value)
    );
  }

  public get myIncome(): string {
    return this.myIncomeTotal ? ` ${this.myIncomeTotal}` : '';
  }

  public get totalIncome(): string {
    const totalIncome = this.myIncomeTotal + this.incomeSpouseTotal;
    return totalIncome ? ` ${totalIncome}` : '';
  }

  public get showSpouse(): boolean {
    return this.incomeDetailForm.get('hasSpouse')?.value;
  }

  public onCancel(): void {
    this.cancel.emit();
    this.incomeDetailForm.reset();
  }

  public onSave(): void {
    const income = {
      total: this.totalIncome,
      salary: this.incomeDetailForm.get('salary')?.value,
      pension: this.incomeDetailForm.get('pension')?.value,
      deposit: this.incomeDetailForm.get('deposit')?.value,
      other: this.incomeDetailForm.get('other')?.value,
      hasSpouse: this.incomeDetailForm.get('hasSpouse')?.value,
      salarySpouse: this.incomeDetailForm.get('salarySpouse')?.value,
      pensionSpouse: this.incomeDetailForm.get('pensionSpouse')?.value,
      depositSpouse: this.incomeDetailForm.get('depositSpouse')?.value,
      otherSpouse: this.incomeDetailForm.get('otherSpouse')?.value,
    };
    this.incomeDetailChange.emit(income);
    this.incomeDetailForm.reset();
  }

  private initForm(): void {
    this.incomeDetailForm = this.fb.group({
      salary: [''],
      pension: [''],
      deposit: [''],
      other: [''],
      hasSpouse: [false],
      salarySpouse: [''],
      pensionSpouse: [''],
      depositSpouse: [''],
      otherSpouse: [''],
    });
  }
}
