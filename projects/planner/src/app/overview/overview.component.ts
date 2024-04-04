import { Component, OnInit } from '@angular/core';
import { ShellService } from 'components';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  standalone: true,
})
export class OverviewComponent implements OnInit {
  constructor(private shellService: ShellService) {}

  public ngOnInit(): void {
    this.setHeaderConfig();
  }

  private setHeaderConfig(): void {
    this.shellService.headerConfig = {
      headerTitle: 'overview',
      menuIcon: 'apps',
    };
  }
}
