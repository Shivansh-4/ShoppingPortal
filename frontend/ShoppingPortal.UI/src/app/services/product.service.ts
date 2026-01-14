import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product{
  productId: number,
  productName: string,
  description: string,
  categoryId: number,
  categoryName: string,
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

  getProduct(productId: number): Observable<any>{
    return this.http.get<any>(`${this.url}/${productId}`);
  }

  addProduct(data: any): Observable<any>{
    return this.http.post<any>(this.url, data);
  }

  delete(productId: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${productId}`);
  }

  editProducts(productId: number, data: any): Observable<any>{
    return this.http.put<any>(`${this.url}/${productId}`, data);
  }
}
