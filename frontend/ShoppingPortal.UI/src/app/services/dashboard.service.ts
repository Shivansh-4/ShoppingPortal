import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

export interface dashboardItems{
  category: string,
  spend: number
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly Url = "http://localhost:5241/api/dashboard";

  constructor(private http: HttpClient) { }

  GetData():Observable<dashboardItems[]>{
    return this.http.get<dashboardItems[]>(this.Url);
  }

  GetFilteredData(d1: string, d2: string): Observable<dashboardItems[]>{
    const params = new HttpParams().set('d1', d1).set('d2', d2);
    return this.http.get<dashboardItems[]>(`${this.Url}/filter`, {params});
  }
}
