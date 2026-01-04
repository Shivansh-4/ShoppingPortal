import { Injectable } from '@angular/core';

export interface CartItem{
  productId: number,
  productName: string,
  price: number,
  quantity: number,
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];

  constructor() { }

  saveCart(): void{
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
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
    if(prod){
      prod.quantity = quantity;

      if(prod.quantity <= 0){
        this.removeFromCart(productId);
      }
      this.saveCart();
    }
  }

  getCartItems(): CartItem[]{
    return this.cartItems;
  }

  clearCart(): void{
    this.cartItems = [];
    localStorage.removeItem('cart');
  }

  getTotalPrice(): number{
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotalItems(): number{
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  loadCart(): void{
    const cart = localStorage.getItem('cart');
    if(cart){
      this.cartItems = JSON.parse(cart);
    }
  }
}
