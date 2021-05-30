import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {

    this._dataService.getGlobalData().subscribe(
      {
        next: (result) => {
          console.log(result);

          result.forEach(cs => {
            if (!Number.isNaN(cs.confirmed)) {
              this.totalActive += cs.active
              this.totalConfirmed += cs.confirmed
              this.totalDeaths += cs.deaths
              this.totalRecovered += cs.active
            }
          });

        }
      }
    )
  }
}
