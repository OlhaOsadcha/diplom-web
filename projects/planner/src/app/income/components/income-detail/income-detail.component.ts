import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
    TranslateModule,
  ],
})
export class IncomeDetailComponent implements OnInit {
  @Input() public set incomeModel(incomeModel: IncomeModel | undefined) {
    this.incomeModelId = incomeModel?.id;
    this.isBaseline = incomeModel?.isBaseline;
    this.initForm(incomeModel);
  }
  @Output() public cancel = new EventEmitter<void>();
  @Output() public incomeDetailChange = new EventEmitter<IncomeModel>();

  public incomeDetailForm!: UntypedFormGroup;
  private incomeModelId: string | undefined;
  private isBaseline: boolean | undefined;
  constructor(private fb: UntypedFormBuilder) {}

  public ngOnInit(): void {
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

  public get incomeTotal(): number {
    return this.myIncomeTotal + this.incomeSpouseTotal;
  }

  public get totalIncome(): string {
    return this.incomeTotal ? ` ${this.incomeTotal}` : '';
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
      id: this.incomeModelId,
      isBaseline: this.isBaseline,
      year: this.incomeDetailForm.get('year')?.value,
      total: this.incomeTotal.toString(),
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

    if (!income.hasSpouse) {
      income.salarySpouse = '';
      income.pensionSpouse = '';
      income.depositSpouse = '';
      income.otherSpouse = '';
    }

    this.incomeDetailChange.emit(income);
    this.incomeDetailForm.reset();
  }

  private initForm(income?: IncomeModel): void {
    this.incomeDetailForm = this.fb.group({
      year: [income?.year || ''],
      salary: [income?.salary || ''],
      pension: [income?.pension || ''],
      deposit: [income?.deposit || ''],
      other: [income?.other || ''],
      hasSpouse: [income?.hasSpouse || false],
      salarySpouse: [income?.salarySpouse || ''],
      pensionSpouse: [income?.pensionSpouse || ''],
      depositSpouse: [income?.depositSpouse || ''],
      otherSpouse: [income?.otherSpouse || ''],
    });
  }
}
