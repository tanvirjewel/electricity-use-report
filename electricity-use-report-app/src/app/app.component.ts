import { Component, ViewChild, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { AppService } from './app.service';
import { Building, DataField, DataObject, RequestModel } from './app.model';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'electricity-use-report-app';

  @ViewChild('lineChart') private chartRef;
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;

  chart: any;
  minDate: Date;
  maxDate: Date;
  data: any;
  datetime: any;
  buildings: Building[];
  objects: DataObject[];
  dataFields: DataField[];
  daterange: string;
  bsRangeValue: Date[];
  building: Building;
  dataObject: DataObject;
  datafield: DataField;
  isSaving = false;

  constructor(private appService: AppService) {
    this.buildings = [];
    this.objects = [];
    this.dataFields = [];
    this.minDate = new Date("01/01/2018");
    this.maxDate = new Date("12/31/2019");
    this.bsRangeValue = [new Date("01/01/2018 00:00:00:000Z"), new Date("01/02/2018 23:59:59:000Z")];
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
    const requestModel = new RequestModel();
    if (this.building != null) {
      requestModel.buildingId = this.building.Id;
    }
    if (this.dataObject != null) {
      requestModel.objectId = this.dataObject.Id;
    }
    if (this.datafield != null) {
      requestModel.datafieldId = this.datafield.Id;
    }
    if (this.bsRangeValue != null && this.bsRangeValue.length > 0) {
      requestModel.startDate = this.bsRangeValue[0];
      requestModel.endDate = this.bsRangeValue[1];
    }

    this.isSaving = true;
    this.appService.GetDataWithFilter(requestModel).subscribe((res) => {

      this.data = res['value'];
      this.datetime = res['datetime'];
      this.generateChart();
      this.isSaving = false;
    }, (err) => {
      this.isSaving = false;
    });
  }


  generateChart() {
    if (this.chart != null) {
      this.chart.destroy();
    }
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
            borderWidth: 2,
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
              min: 60,
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
