import { Component, ViewChild, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'electricity-use-report-app';

  @ViewChild('lineChart') private chartRef;

  chart: any;
  data: any;
  times: any;
  test: any;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 500);

    this.appService.GetData().subscribe((res) => {
      this.test = res;
    });
  }

  getData() {

    const interval = 5;
    this.times = [];
    this.data = [];
    let startTime = 0;
    let dataStart = 0;

    for (var i = 0; i < 14400; i++) {

      var mm = Math.random() * (15 - 14) + 14;;
      this.data[i] = mm;

    }

    for (var i = 0; startTime < 24 * 60; i++) {
      var hh = Math.floor(startTime / 60);
      var mm = (startTime % 60);
      this.times[i] = ("0" + hh).slice(-2) + ':' + ("0" + mm).slice(-2); // + ap[Math.floor(hh / 12)];
      startTime = startTime + interval;
    }
    this.times.push = "23:59";
    this.generateChart();

  }


  generateChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.times,
        datasets: [
          {
            label: "Timeserise data",
            data: this.data,
            borderColor: "#6e0000",
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 3
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              maxTicksLimit: 26,
              major: {
                enabled: true,
                fontStyle: 'bold'
              },
              autoSkip: true,
              autoSkipPadding: 75,
              maxRotation: 0
            },
            scaleLabel: {
              display: true,
              labelString: 'Time in 24 hours'
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              min: 0,
              max: 22
            },
            gridLines: {
              drawBorder: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }],
        }
      },
    });
  }


}
