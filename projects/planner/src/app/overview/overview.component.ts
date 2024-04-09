import { Component, OnInit } from '@angular/core';
import { CardComponent } from 'components';
import { ChipConfig } from 'components';
import { LIB_COLOR } from 'components';
import { ShellService } from 'components';
import { CardHeaderComponent } from '../shared/components/card-header/card-header.component';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: 'overview.component.scss',
  standalone: true,
  imports: [CardComponent, CardHeaderComponent],
})
export class OverviewComponent implements OnInit {
  constructor(private shellService: ShellService) {}

  public ngOnInit(): void {
    this.setHeaderConfig();
  }

  public get chipConfig(): ChipConfig {
    return {
      displayString: 'Baseline',
      color: LIB_COLOR.accentGreen,
    };
  }

  private setHeaderConfig(): void {
    this.shellService.headerConfig = {
      headerTitle: 'overview',
      menuIcon: 'apps',
    };
  }
}
