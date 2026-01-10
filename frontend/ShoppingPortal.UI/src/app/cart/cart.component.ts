import { CommonModule } from '@angular/common';
import { Component, NgZoneOptions, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem, CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  isSuccess = false;
  cartItems: CartItem[] = []

  constructor(private cartService: CartService, 
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(i => {
      this.cartItems = i;
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.UpdateQuantity(productId, quantity);
  }

  getTotal(): number{
    return this.cartService.getTotalPrice();
  }

  placeOrder() {
    this.orderService.placeOrder(this.cartItems).subscribe({ next: () => {
      this.cartService.clearCart();
      this.router.navigate(['/orders']);
    }, error: (err) => {
      alert('Order was not placed');
      console.error(err);
      }
    });
  }
}
