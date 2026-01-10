import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})
export class MyordersComponent implements OnInit {

  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        alert('Failed to load orders');
        this.loading = false;
      }
    });
  }
}
