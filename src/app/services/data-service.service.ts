import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/gloabl-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-03-2020.csv';


  constructor(private _httpClient: HttpClient) { }

  getGlobalData() {
    return this._httpClient.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        let data: GlobalDataSummary[] = [];
        let raw = {};
        //Split each line of csv file
        let rows = result.split('\n');
        //remove 1st row as it is header from csv
        rows.splice(0, 1);

        rows.forEach(row => {

          //Now in each row split each column by comma. (Regular exp is used as last column has multiple values)
          let cols = row.split(/,(?=\S)/);

          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };

          let temp: GlobalDataSummary = raw[cs.country];
          //Merge all the rows country wise.
          if (temp) {
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed + temp.confirmed
            temp.deaths = cs.deaths + temp.deaths
            temp.recovered = cs.recovered + temp.recovered

            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
        });

        return <GlobalDataSummary[]>Object.values(raw);

      })
    )
  }
}
