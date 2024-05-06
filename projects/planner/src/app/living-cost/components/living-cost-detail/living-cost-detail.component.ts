import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ButtonComponent } from 'components';
import { CheckboxComponent } from '../../../../../../components/src/input/checkbox/checkbox.component';
import { InputWrapperComponent } from '../../../../../../components/src/input/input-wrapper/input-wrapper.component';
import { TextFieldDirective } from '../../../../../../components/src/input/text-field/text-field.directive';
import { LivingCostModel } from '../../../shared/models/living-cost.model';

@Component({
  selector: 'app-living-cost-detail',
  templateUrl: './living-cost-detail.component.html',
  styleUrl: 'living-cost-detail.component.scss',
  standalone: true,
  imports: [
    CheckboxComponent,
    InputWrapperComponent,
    TextFieldDirective,
    ButtonComponent,
    ReactiveFormsModule,
  ],
})
export class LivingCostDetailComponent {
  @Input() public set livingCostModel(livingCostModel: LivingCostModel | undefined) {
    this.livingCostModelId = livingCostModel?.id;
    this.initForm(livingCostModel);
  }
  @Output() public cancel = new EventEmitter<void>();
  @Output() public livingCostDetailChange = new EventEmitter<LivingCostModel>();

  public livingCostDetailForm!: UntypedFormGroup;
  private livingCostModelId: string | undefined;
  constructor(private fb: UntypedFormBuilder) {}

  public get isSaveDisabled(): boolean {
    return this.livingCostTotal <= 0;
  }

  public get livingCostTotal(): number {
    return (
      Number(this.livingCostDetailForm.get('mortgage')?.value) +
      Number(this.livingCostDetailForm.get('rent')?.value) +
      Number(this.livingCostDetailForm.get('loans')?.value) +
      Number(this.livingCostDetailForm.get('utilities')?.value) +
      Number(this.livingCostDetailForm.get('education')?.value) +
      Number(this.livingCostDetailForm.get('markets')?.value) +
      Number(this.livingCostDetailForm.get('transportation')?.value) +
      Number(this.livingCostDetailForm.get('other')?.value)
    );
  }

  public get totalLivingCost(): string {
    return this.livingCostTotal ? ` ${this.livingCostTotal}` : '';
  }

  public onCancel(): void {
    this.cancel.emit();
    this.livingCostDetailForm.reset();
  }

  public onSave(): void {
    const livingCost = {
      id: this.livingCostModelId,
      total: this.livingCostTotal.toString(),
      mortgage: this.livingCostDetailForm.get('mortgage')?.value,
      rent: this.livingCostDetailForm.get('rent')?.value,
      loans: this.livingCostDetailForm.get('loans')?.value,
      utilities: this.livingCostDetailForm.get('utilities')?.value,
      education: this.livingCostDetailForm.get('education')?.value,
      markets: this.livingCostDetailForm.get('markets')?.value,
      transportation: this.livingCostDetailForm.get('transportation')?.value,
      other: this.livingCostDetailForm.get('other')?.value,
    };
    this.livingCostDetailChange.emit(livingCost);
    this.livingCostDetailForm.reset();
  }

  private initForm(livingCostModel?: LivingCostModel): void {
    this.livingCostDetailForm = this.fb.group({
      mortgage: [livingCostModel?.mortgage || ''],
      rent: [livingCostModel?.rent || ''],
      loans: [livingCostModel?.loans || ''],
      utilities: [livingCostModel?.utilities || ''],
      education: [livingCostModel?.education || ''],
      markets: [livingCostModel?.markets || ''],
      transportation: [livingCostModel?.transportation || ''],
      other: [livingCostModel?.other || ''],
    });
  }
}
