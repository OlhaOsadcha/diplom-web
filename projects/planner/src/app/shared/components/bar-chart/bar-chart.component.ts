import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: 'bar-chart.component.html',
  standalone: true,
  imports: [],
})
export class BarChartComponent implements OnInit {
  @Input() public labels: string[] | undefined;
  @Input() public data: number[] | undefined;
  public chart: unknown;

  constructor() {
    Chart.register(...registerables);
  }

  public ngOnInit(): void {
    this.chart = new Chart('profit', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            indexAxis: 'y',
            label: '',
            data: this.data,
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
