import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        return this.http.get("http://localhost:8090/data", headers);
    }

}