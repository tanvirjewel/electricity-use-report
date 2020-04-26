import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Building, DataObject, DataField } from './app.model';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) { }

    GetData() {
        const headers = {
            headers: new HttpHeaders({

                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            })
        };
        return this.http.get("http://localhost:26978/api/DataAPI", headers);
    }

    GetBuilding(): Observable<Building[]> {
        const headers = {
            headers: new HttpHeaders({

                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            })
        };
        return this.http.get<Building[]>("http://localhost:26978/api/DataAPI/building", headers);
    }

    GetObject(): Observable<DataObject[]> {
        const headers = {
            headers: new HttpHeaders({

                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            })
        };
        return this.http.get<DataObject[]>("http://localhost:26978/api/DataAPI/object", headers);
    }

    GetDataField(): Observable<DataField[]> {
        const headers = {
            headers: new HttpHeaders({

                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            })
        };
        return this.http.get<DataField[]>("http://localhost:26978/api/DataAPI/datafield", headers);
    }

}