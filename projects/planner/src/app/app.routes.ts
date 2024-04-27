import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { IncomeComponent } from './income/pages/income/income.component';
import { LivingCostComponent } from './living-cost/pages/living-cost/living-cost.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'income',
    component: IncomeComponent,
  },
  {
    path: 'livingcost',
    component: LivingCostComponent,
  },
];
