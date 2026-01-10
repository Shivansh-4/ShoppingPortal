import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';
import { Observable } from 'rxjs';

export interface order{
  productId: number,
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:5241/api/orders';

  constructor(private http: HttpClient) { }

  private orders: order[] = [];

  placeOrder(cartItem: CartItem[]): Observable<any> {
    const payload = {
      OrderItems: cartItem.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    }

    return this.http.post(this.apiUrl, payload);
  }

  getMyOrders() {
    return this.http.get<any[]>('http://localhost:5241/api/orders/my');
  }
}
