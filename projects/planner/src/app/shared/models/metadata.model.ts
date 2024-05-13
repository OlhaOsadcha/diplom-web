import { IncomeModel } from './income.model';
import { LivingCostModel } from './living-cost.model';

export interface MetadataModel {
  income?: IncomeModel;
  costOfLiving?: LivingCostModel;
}
