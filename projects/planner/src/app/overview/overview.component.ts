import { Component, DestroyRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { ButtonComponent, CardComponent, OptionItem, SelectComponent } from 'components';
import { ChipConfig } from 'components';
import { LIB_COLOR } from 'components';
import { ShellService } from 'components';
import { CardHeaderComponent } from '../shared/components/card-header/card-header.component';
import { MetadataModel } from '../shared/models/metadata.model';
import { PlannerService } from '../shared/services/planner.service';
import { ShortAmountMoneyPipe } from '../shared/pipes/short-amount-money.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChartComponent } from '../shared/components/chart/chart.component';
import { DoughnutChartModel } from '../shared/models/doughnut-chart.model';
import { IncomeChartComponent } from '../shared/components/income-chart/income-chart.component';
import { BarChartComponent } from '../shared/components/bar-chart/bar-chart.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: 'overview.component.scss',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CardComponent,
    CardHeaderComponent,
    ButtonComponent,
    ShortAmountMoneyPipe,
    TranslateModule,
    SelectComponent,
    ReactiveFormsModule,
    ChartComponent,
    ChartComponent,
    IncomeChartComponent,
    BarChartComponent,
  ],
})
export class OverviewComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('actionBar', { static: true }) public actionBar: TemplateRef<any> | undefined;

  public costOfLivingDoughnutChart: DoughnutChartModel | undefined;
  public incomeDoughnutChart: DoughnutChartModel | undefined;
  public isLoading: boolean | undefined;
  public metadata: MetadataModel | undefined;
  public languageFormControl = new FormControl();
  public languageOptions: OptionItem[] = [
    {
      value: 'en-US',
      label: 'English',
    },
    {
      value: 'uk-UA',
      label: 'Українська',
    },
  ];
  public selectedLanguage = '';

  private readonly destroy: DestroyRef = inject(DestroyRef);

  constructor(
    private plannerService: PlannerService,
    private router: Router,
    private shellService: ShellService,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.setHeaderConfig();
    this.initLanguageFeature();
    this.getMetadata();
  }

  public get chipConfig(): ChipConfig {
    return {
      displayString: 'BASELINE',
      color: LIB_COLOR.accentGreen,
    };
  }

  public get incomeButtonName(): string {
    return Number(this.metadata?.income?.total) ? 'BUTTON_VIEW_ALL' : 'BUTTON_ADD_INCOME_SCENARIO';
  }

  public get livingCostButtonName(): string {
    return Number(this.metadata?.costOfLiving?.total)
      ? 'BUTTON_VIEW_ALL'
      : 'BUTTON_ADD_COST_OF_LIVING_SCENARIO';
  }

  public get profit(): string {
    const profit =
      Number(this.metadata?.income?.total) - Number(this.metadata?.costOfLiving?.total);
    return profit.toString();
  }

  public get profitLabels(): string[] {
    return [
      this.translateService.instant('INCOME_SCENARIO'),
      this.translateService.instant('COST_OF_LIVING_SCENARIO'),
    ];
  }

  public get profitData(): number[] {
    return [Number(this.metadata?.income?.total), Number(this.metadata?.costOfLiving?.total)];
  }

  public onViewIncome(): void {
    this.isLoading = true;
    this.router.navigate(['income']).finally(() => {
      this.isLoading = false;
    });
  }

  public onViewLivingCost(): void {
    this.isLoading = true;
    this.router.navigate(['livingcost']).finally(() => {
      this.isLoading = false;
    });
  }

  private getMetadata(): void {
    this.isLoading = true;

    this.plannerService
      .getMetadata()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: metadata => {
          this.metadata = metadata;
          this.setIncomeDoughnutChart();
          this.setCostOfLivingDoughnutChart();
        },
      });
  }

  private setCostOfLivingDoughnutChart(): void {
    let labels: string[] = [];
    let data: number[] = [];

    if (this.metadata?.costOfLiving?.mortgage) {
      labels = [...labels, this.translateService.instant('MORTGAGE')];
      data = [...data, Number(this.metadata?.costOfLiving?.mortgage)];
    }

    if (this.metadata?.costOfLiving?.rent) {
      labels = [...labels, this.translateService.instant('RENT')];
      data = [...data, Number(this.metadata?.costOfLiving?.rent)];
    }

    if (this.metadata?.costOfLiving?.loans) {
      labels = [...labels, this.translateService.instant('LOANS')];
      data = [...data, Number(this.metadata?.costOfLiving?.loans)];
    }

    if (this.metadata?.costOfLiving?.utilities) {
      labels = [...labels, this.translateService.instant('UTILITIES')];
      data = [...data, Number(this.metadata?.costOfLiving?.utilities)];
    }

    if (this.metadata?.costOfLiving?.education) {
      labels = [...labels, this.translateService.instant('EDUCATION')];
      data = [...data, Number(this.metadata?.costOfLiving?.education)];
    }

    if (this.metadata?.costOfLiving?.markets) {
      labels = [...labels, this.translateService.instant('MARKETS')];
      data = [...data, Number(this.metadata?.costOfLiving?.markets)];
    }

    if (this.metadata?.costOfLiving?.transportation) {
      labels = [...labels, this.translateService.instant('TRANSPORTATION')];
      data = [...data, Number(this.metadata?.costOfLiving?.transportation)];
    }

    if (this.metadata?.costOfLiving?.other) {
      labels = [...labels, this.translateService.instant('OTHER')];
      data = [...data, Number(this.metadata?.costOfLiving?.other)];
    }

    this.costOfLivingDoughnutChart = { labels: labels, data: data };
  }

  private setIncomeDoughnutChart(): void {
    let labels: string[] = [];
    let data: number[] = [];

    if (this.metadata?.income?.salary) {
      labels = [...labels, this.translateService.instant('SALARY')];
      data = [...data, Number(this.metadata?.income?.salary)];
    }

    if (this.metadata?.income?.pension) {
      labels = [...labels, this.translateService.instant('PENSION')];
      data = [...data, Number(this.metadata?.income?.pension)];
    }

    if (this.metadata?.income?.deposit) {
      labels = [...labels, this.translateService.instant('DEPOSIT')];
      data = [...data, Number(this.metadata?.income?.deposit)];
    }

    if (this.metadata?.income?.other) {
      labels = [...labels, this.translateService.instant('OTHER')];
      data = [...data, Number(this.metadata?.income?.other)];
    }

    if (this.metadata?.income?.salarySpouse) {
      labels = [...labels, this.translateService.instant('SALARY') + '*'];
      data = [...data, Number(this.metadata?.income?.salarySpouse)];
    }

    if (this.metadata?.income?.pensionSpouse) {
      labels = [...labels, this.translateService.instant('PENSION') + '*'];
      data = [...data, Number(this.metadata?.income?.pensionSpouse)];
    }

    if (this.metadata?.income?.depositSpouse) {
      labels = [...labels, this.translateService.instant('DEPOSIT') + '*'];
      data = [...data, Number(this.metadata?.income?.depositSpouse)];
    }

    if (this.metadata?.income?.otherSpouse) {
      labels = [...labels, this.translateService.instant('OTHER') + '*'];
      data = [...data, Number(this.metadata?.income?.otherSpouse)];
    }

    this.incomeDoughnutChart = { labels: labels, data: data };
  }

  private setHeaderConfig(): void {
    this.shellService.headerConfig = {
      headerTitle: 'OVERVIEW_PAGE_HEADER_TITLE',
      menuIcon: 'apps',
      actionBarTemplate: this.actionBar,
    };
  }

  private initLanguageFeature(): void {
    const defaultLanguage = this.languageOptions.find(
      l => l.value === this.translateService.currentLang
    );
    this.selectedLanguage = defaultLanguage?.label || '';
    this.languageFormControl.valueChanges.pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: l => this.translateService.use(l),
    });
  }
}
