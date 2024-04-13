import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ButtonComponent, CardComponent } from 'components';
import { ChipConfig } from 'components';
import { LIB_COLOR } from 'components';
import { ShellService } from 'components';
import { CardHeaderComponent } from '../shared/components/card-header/card-header.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: 'overview.component.scss',
  standalone: true,
  imports: [MatProgressSpinnerModule, CardComponent, CardHeaderComponent, ButtonComponent],
})
export class OverviewComponent implements OnInit {
  public isLoading: boolean | undefined;

  constructor(
    private router: Router,
    private shellService: ShellService
  ) {}

  public ngOnInit(): void {
    this.setHeaderConfig();
  }

  public get chipConfig(): ChipConfig {
    return {
      displayString: 'Baseline',
      color: LIB_COLOR.accentGreen,
    };
  }

  public onViewIncome(): void {
    this.isLoading = true;
    this.router.navigate(['income']);
  }

  private setHeaderConfig(): void {
    this.shellService.headerConfig = {
      headerTitle: 'Baseline scenario overview',
      menuIcon: 'apps',
    };
  }
}
