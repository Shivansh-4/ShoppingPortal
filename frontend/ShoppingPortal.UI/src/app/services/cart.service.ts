import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem{
  productId: number,
  productName: string,
  price: number,
  quantity: number,
  imageUrl: string,
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    const cart = sessionStorage.getItem('cart');
    if(cart){
      this.cartItems = JSON.parse(cart);
      this.cartSubject.next(this.cartItems);
    }
  }

  saveCart(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  addToCart(item: CartItem): void{
    const existingItem = this.cartItems.find(i => i.productId === item.productId);
    if(existingItem){
      existingItem.quantity += item.quantity;
    }
    else{
      this.cartItems.push(item);
    }

    this.saveCart();
  }

  removeFromCart(productId: number): void{
    this.cartItems = this.cartItems.filter(i => i.productId !== productId);

    this.saveCart();
  }

  UpdateQuantity(productId: number, quantity: number): void{
    const prod = this.cartItems.find(i => i.productId === productId);
    if(prod && quantity > 0){
      prod.quantity = quantity;
      this.saveCart();
    }
  }

  getCartItems(): CartItem[]{
    return this.cartItems;
  }

  clearCart(): void{
    this.cartItems = [];
    sessionStorage.removeItem('cart');
    this.cartSubject.next(this.cartItems);
  }

  getTotalPrice(): number{
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotalItems(): number{
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  loadCart(): void{
    const cart = sessionStorage.getItem('cart');
    if(cart){
      this.cartItems = JSON.parse(cart);
    }
  }
}
