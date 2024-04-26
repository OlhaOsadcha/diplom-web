import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { ButtonComponent, CardComponent } from 'components';
import { ChipConfig } from 'components';
import { LIB_COLOR } from 'components';
import { ShellService } from 'components';
import { CardHeaderComponent } from '../shared/components/card-header/card-header.component';
import { MetadataModel } from '../shared/models/metadata.model';
import { PlannerService } from '../shared/services/planner.service';
import { ShortAmountMoneyPipe } from '../shared/pipes/short-amount-money.pipe';

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
  ],
})
export class OverviewComponent implements OnInit {
  public isLoading: boolean | undefined;
  public metadata: MetadataModel | undefined;

  constructor(
    private plannerService: PlannerService,
    private router: Router,
    private shellService: ShellService
  ) {}

  public ngOnInit(): void {
    this.setHeaderConfig();
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
    };
  }
}
