import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() public cancel = new EventEmitter<void>();

  public incomeDetailForm!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {}

  public ngOnInit(): void {
    this.initForm();

    this.incomeDetailForm.get('hasSpouse')?.valueChanges.subscribe({
      next: value => {
        if (value === false) {
          this.incomeDetailForm.get('salarySpouse')?.setValue('');
          this.incomeDetailForm.get('pensionSpouse')?.setValue('');
          this.incomeDetailForm.get('arfSpouse')?.setValue('');
          this.incomeDetailForm.get('depositSpouse')?.setValue('');
          this.incomeDetailForm.get('otherSpouse')?.setValue('');
        }
      },
    });
  }

  public get incomeSpouseTotal(): number {
    return (
      Number(this.incomeDetailForm.get('salarySpouse')?.value) +
      Number(this.incomeDetailForm.get('pensionSpouse')?.value) +
      Number(this.incomeDetailForm.get('arfSpouse')?.value) +
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
      Number(this.incomeDetailForm.get('arf')?.value) +
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
