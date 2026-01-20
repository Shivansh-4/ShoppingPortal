import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface dashboardItems{
  Category: string,
  Spend: number
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly Url = "http://localhost:5241/api/dashboard";

  constructor(private http: HttpClient) { }

  GetData():Observable<any>{
    return this.http.get<any>(this.Url);
  }
}
