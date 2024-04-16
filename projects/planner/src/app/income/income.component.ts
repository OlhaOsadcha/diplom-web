import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { ButtonComponent, CardComponent, ShellService } from 'components';
import { PlannerService } from '../shared/services/planner.service';
import { IncomeModel } from '../shared/models/income.model';
import { CardHeaderComponent } from '../shared/components/card-header/card-header.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: 'income.component.scss',
  standalone: true,
  imports: [ButtonComponent, CardComponent, CardHeaderComponent, MatProgressSpinner],
})
export class IncomeComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('actionBar', { static: true }) public actionBar: TemplateRef<any> | undefined;

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

  public onAddIncome(): void {
    this.shellService.toggleDrawer();
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
      headerTitle: 'Income overview',
      menuIcon: 'chevron_left',
      menuIconClickHandler: () => this.router.navigate(['overview']),
    };
  }
}
