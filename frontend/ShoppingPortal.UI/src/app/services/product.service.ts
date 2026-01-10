import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product{
  productId: number,
  productName: string,
  description: string,
  categoryId: number,
  stock: number,
  price: number,
  imageUrl: string,
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:5241/api/products";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any>{
    return this.http.get<any[]>(this.url);
  }
}
