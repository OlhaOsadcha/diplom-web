import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { IncomeComponent } from './income/income.component';

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
];
