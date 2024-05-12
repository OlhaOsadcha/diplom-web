import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, CardComponent, LIB_COLOR, ShellService, TextComponent } from 'components';
import { LivingCostDetailComponent } from '../../components/living-cost-detail/living-cost-detail.component';
import { IncomeDetailComponent } from '../../../income/components/income-detail/income-detail.component';
import { ObjectValues } from '../../../../../../components/src/utils/typescript-utils';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { LivingCostModel } from '../../../shared/models/living-cost.model';
import { ShortAmountMoneyPipe } from '../../../shared/pipes/short-amount-money.pipe';
import { PlannerService } from '../../../shared/services/planner.service';

const MODE = {
  New: 'new',
  Existing: 'existing',
} as const;

type Mode = ObjectValues<typeof MODE>;

@Component({
  selector: 'app-living-cost',
  templateUrl: './living-cost.component.html',
  styleUrl: 'living-cost.component.scss',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    MatProgressSpinner,
    IncomeDetailComponent,
    MatIcon,
    ShortAmountMoneyPipe,
    TextComponent,
    LivingCostDetailComponent,
    TranslateModule,
  ],
})
export class LivingCostComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('actionBar', { static: true }) public actionBar: TemplateRef<any> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('drawer', { static: true }) public drawer: TemplateRef<any> | undefined;

  public livingCost: LivingCostModel | undefined;
  public isEditing: boolean = false;
  public isLoading: boolean | undefined;
  public livingCosts: LivingCostModel[] | undefined;
  private mode: Mode | undefined;

  constructor(
    private plannerService: PlannerService,
    private router: Router,
    private shellService: ShellService
  ) {}
  public ngOnInit(): void {
    this.setHeaderConfig();
    this.getLivingCost();
  }

  public ngOnDestroy() {
    this.shellService.closeDrawer();
  }

  public getChipConfig(livingCost: LivingCostModel) {
    return livingCost.isBaseline
      ? { displayString: 'BASELINE', color: LIB_COLOR.accentGreen }
      : undefined;
  }

  public getActionVisibility(livingCost: LivingCostModel) {
    return !livingCost.isBaseline;
  }

  public onAddLivingCost(): void {
    this.mode = MODE.New;
    this.livingCost = {};
    this.isEditing = true;
    this.shellService.openDrawer();
  }

  public onUpdateLivingCost(livingCost: LivingCostModel): void {
    this.mode = MODE.Existing;
    this.livingCost = livingCost;
    this.isEditing = true;
    this.shellService.openDrawer();
  }

  public onCancel(): void {
    this.shellService.closeDrawer();
    this.isEditing = false;
  }

  public onDelete(livingCost: LivingCostModel): void {
    this.isLoading = true;
    this.plannerService
      .deleteLivingCost(livingCost.id || '')
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: livingCosts => (this.livingCosts = livingCosts),
      });
  }

  public onBaselineLivingCostChange(livingCost: LivingCostModel): void {
    this.isLoading = true;
    this.plannerService
      .setBaselineLivingCost(livingCost.id || '')
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: livingCosts => (this.livingCosts = livingCosts),
      });
  }

  public onLivingCostDetailChange(livingCost: LivingCostModel): void {
    this.shellService.closeDrawer();

    this.isLoading = true;

    const updateState =
      this.mode === MODE.New
        ? this.plannerService.createLivingCost(livingCost)
        : this.plannerService.updateLivingCost(livingCost);

    updateState
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.isEditing = false;
        })
      )
      .subscribe({
        next: livingCosts => (this.livingCosts = livingCosts),
      });
  }

  private getLivingCost(): void {
    this.isLoading = true;

    this.plannerService
      .getLivingCost()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: livingCosts => (this.livingCosts = livingCosts),
      });
  }

  private setHeaderConfig(): void {
    this.shellService.headerConfig = {
      actionBarTemplate: this.actionBar,
      drawerTemplate: this.drawer,
      headerTitle: 'COST_OF_LIVING_PAGE_HEADER_TITLE',
      menuIcon: 'chevron_left',
      menuIconClickHandler: () => this.router.navigate(['overview']),
    };
  }
}
