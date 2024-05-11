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
  ],
})
export class OverviewComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('actionBar', { static: true }) public actionBar: TemplateRef<any> | undefined;

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
      displayString: 'Baseline',
      color: LIB_COLOR.accentGreen,
    };
  }

  public get incomeButtonName(): string {
    return this.metadata?.income ? 'View all' : 'Add income scenario';
  }

  public get livingCostButtonName(): string {
    return this.metadata?.costOfLiving ? 'View all' : 'Add Cost of living scenario';
  }

  public get profit(): string {
    const profit = Number(this.metadata?.income) - Number(this.metadata?.costOfLiving);
    return profit.toString();
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
        next: metadata => (this.metadata = metadata),
      });
  }

  private setHeaderConfig(): void {
    this.shellService.headerConfig = {
      headerTitle: 'Baseline scenario overview',
      menuIcon: 'apps',
      actionBarTemplate: this.actionBar,
    };
  }

  private initLanguageFeature(): void {
    const defaultLanguage = this.languageOptions[0];
    this.languageFormControl.setValue(defaultLanguage.value);
    this.selectedLanguage = defaultLanguage.label;
    this.languageFormControl.valueChanges.pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: l => this.translateService.use(l),
    });
  }
}
