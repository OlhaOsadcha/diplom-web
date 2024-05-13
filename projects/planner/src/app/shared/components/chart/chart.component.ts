import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DoughnutChartModel } from '../../models/doughnut-chart.model';

@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  standalone: true,
  imports: [],
})
export class ChartComponent implements OnInit {
  @Input() public doughnutChart: DoughnutChartModel | undefined;
  public chart: unknown;

  constructor() {
    Chart.register(...registerables);
  }

  public ngOnInit(): void {
    this.chart = new Chart('canvas', {
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
