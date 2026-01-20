import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category{
  categoryId: number,
  categoryName: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private Url = "http://localhost:5241/api/categories";

  constructor(private http: HttpClient) { }

  GetCategories(): Observable<any>{
    return this.http.get(this.Url);
  }
}
