import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { ButtonComponent, CardComponent, LIB_COLOR, ShellService } from 'components';
import { PlannerService } from '../../../shared/services/planner.service';
import { IncomeModel } from '../../../shared/models/income.model';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { IncomeDetailComponent } from '../../components/income-detail/income-detail.component';
import { MatIcon } from '@angular/material/icon';
import { ShortAmountMoneyPipe } from '../../../shared/pipes/short-amount-money.pipe';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: 'income.component.scss',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    MatProgressSpinner,
    IncomeDetailComponent,
    MatIcon,
    ShortAmountMoneyPipe,
  ],
})
export class IncomeComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('actionBar', { static: true }) public actionBar: TemplateRef<any> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('drawer', { static: true }) public drawer: TemplateRef<any> | undefined;

  public isEditing: boolean = false;
  public isLoading: boolean | undefined;
  public incomes: IncomeModel[] | undefined;

  constructor(
    private plannerService: PlannerService,
    private router: Router,
    private shellService: ShellService
  ) {}
  public ngOnInit(): void {
    this.setHeaderConfig();
    this.getIncome();
  }

  public getChipConfig(income: IncomeModel) {
    return income.isBaseline
      ? { displayString: 'Baseline', color: LIB_COLOR.accentGreen }
      : undefined;
  }

  public getActionVisibility(income: IncomeModel) {
    return !income.isBaseline;
  }

  public onAddIncome(): void {
    this.isEditing = true;
    this.shellService.openDrawer();
  }

  public onCancel(): void {
    this.shellService.closeDrawer();
    this.isEditing = false;
  }

  public onDelete(income: IncomeModel): void {
    this.isLoading = true;
    this.plannerService
      .deleteIncome(income.id || '')
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: incomes => (this.incomes = incomes),
      });
  }

  public onBaselineIncomeChange(income: IncomeModel): void {
    this.isLoading = true;
    this.plannerService
      .setBaselineIncome(income.id || '')
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: incomes => (this.incomes = incomes),
      });
  }

  public onIncomeDetailChange(income: IncomeModel): void {
    this.shellService.closeDrawer();

    this.isLoading = true;
    this.plannerService
      .createIncome(income)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.isEditing = false;
        })
      )
      .subscribe({
        next: incomes => (this.incomes = incomes),
      });
  }

  private getIncome(): void {
    this.isLoading = true;

    this.plannerService
      .getIncome()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: incomes => (this.incomes = incomes),
      });
  }

  private setHeaderConfig(): void {
    this.shellService.headerConfig = {
      actionBarTemplate: this.actionBar,
      drawerTemplate: this.drawer,
      headerTitle: 'Income overview',
      menuIcon: 'chevron_left',
      menuIconClickHandler: () => this.router.navigate(['overview']),
    };
  }
}
