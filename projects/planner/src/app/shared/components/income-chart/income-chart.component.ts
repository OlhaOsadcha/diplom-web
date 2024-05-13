import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DoughnutChartModel } from '../../models/doughnut-chart.model';

@Component({
  selector: 'app-income-chart',
  templateUrl: 'income-chart.component.html',
  standalone: true,
  imports: [],
})
export class IncomeChartComponent implements OnInit {
  @Input() public doughnutChart: DoughnutChartModel | undefined;
  public chart: unknown;

  constructor() {
    Chart.register(...registerables);
  }

  public ngOnInit(): void {
    this.chart = new Chart('income', {
      type: 'doughnut',
      data: {
        labels: this.doughnutChart?.labels,
        datasets: [
          {
            data: this.doughnutChart?.data,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
          },
        },
      },
    });
  }
}
