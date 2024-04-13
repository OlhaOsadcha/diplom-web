import { Component, OnInit } from '@angular/core';
import { ShellService } from 'components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: 'income.component.scss',
  standalone: true,
  imports: [],
})
export class IncomeComponent implements OnInit {
  constructor(
    private router: Router,
    private shellService: ShellService
  ) {}
  public ngOnInit(): void {
    this.setHeaderConfig();
  }

  private setHeaderConfig(): void {
    this.shellService.headerConfig = {
      headerTitle: 'Income overview',
      menuIcon: 'chevron_left',
      menuIconClickHandler: () => this.router.navigate(['overview']),
    };
  }
}
