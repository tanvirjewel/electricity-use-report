import { Component, ViewChild, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { AppService } from './app.service';
import { Building, DataField, DataObject } from './app.model';

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
  datetime: any;
  buildings: Building[];
  objects: DataObject[];
  dataFields: DataField[];

  constructor(private appService: AppService) {
    this.buildings = [];
    this.objects = [];
    this.dataFields = [];
  }

  ngOnInit(): void {
    this.getBuildingData();
    this.getObject();
    this.getDataField();
    // this.getData();
  }

  getBuildingData() {
    this.appService.GetBuilding().subscribe((res) => {
      this.buildings = res;
    });
  }

  getObject() {
    this.appService.GetObject().subscribe((res) => {
      this.objects = res;
    });
  }

  getDataField() {
    this.appService.GetDataField().subscribe((res) => {
      this.dataFields = res;
    });
  }

  getData() {

    this.appService.GetData().subscribe((res) => {

      this.data = res['value'];
      this.datetime = res['datetime'];
      this.generateChart();
    });
  }


  generateChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.datetime,
        datasets: [
          {
            label: "Timeserise data",
            data: this.data,
            borderColor: "#6e0000",
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
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
              maxTicksLimit: 24,
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
