import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../services/order.service';

interface CategorySpend {
  category: string;
  amount: number;
  color: string;
}

interface PieSegment {
  path: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  orders: any[] = [];
  categorySpends: CategorySpend[] = [];
  totalSpend: number = 0;
  selectedPeriod: string = 'all';
  selectedMonth: string = '';
  selectedYear: string = '';

  colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getMyOrders().subscribe(orders => {
      this.orders = orders;
      this.processData();
    });
  }

  processData(): void {
    let filteredOrders = this.orders;

    if (this.selectedPeriod === 'month' && this.selectedMonth && this.selectedYear) {
      filteredOrders = this.orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate.getMonth() + 1 === parseInt(this.selectedMonth) &&
               orderDate.getFullYear() === parseInt(this.selectedYear);
      });
    } else if (this.selectedPeriod === 'year' && this.selectedYear) {
      filteredOrders = this.orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate.getFullYear() === parseInt(this.selectedYear);
      });
    }

    const categoryMap = new Map<string, number>();

    filteredOrders.forEach(order => {
      order.orderItems.forEach((item: any) => {
        const category = item.categoryName || `Category ${item.categoryId}`;
        const amount = item.price * item.quantity;
        categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
      });
    });

    this.categorySpends = Array.from(categoryMap.entries()).map(([category, amount], index) => ({
      category,
      amount,
      color: this.colors[index % this.colors.length]
    }));

    this.totalSpend = this.categorySpends.reduce((sum, spend) => sum + spend.amount, 0);
  }

  getCategoryName(categoryId: number): string {
    // This should ideally come from a category service
    return `Category ${categoryId}`;
  }

  onPeriodChange(): void {
    this.processData();
  }

  onMonthChange(): void {
    if (this.selectedMonth && this.selectedYear) {
      this.processData();
    }
  }

  onYearChange(): void {
    this.processData();
  }

  getPieSegments(): PieSegment[] {
    const segments: PieSegment[] = [];
    let startAngle = 0;

    this.categorySpends.forEach((spend, index) => {
      const percentage = spend.amount / this.totalSpend;
      const angle = percentage * 2 * Math.PI;
      const endAngle = startAngle + angle;

      const x1 = Math.cos(startAngle) * 80;
      const y1 = Math.sin(startAngle) * 80;
      const x2 = Math.cos(endAngle) * 80;
      const y2 = Math.sin(endAngle) * 80;

      const largeArcFlag = angle > Math.PI ? 1 : 0;

      const path = `M 0 0 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      segments.push({
        path,
        color: spend.color
      });

      startAngle = endAngle;
    });

    return segments;
  }

  getRotation(index: number): string {
    let rotation = 0;
    for (let i = 0; i < index; i++) {
      rotation += (this.categorySpends[i].amount / this.totalSpend) * 360;
    }
    return rotation + 'deg';
  }

  getClipPath(index: number): string {
    const percentage = this.categorySpends[index].amount / this.totalSpend;
    const angle = percentage * 360;
    if (angle <= 180) {
      const x = 50 + 50 * Math.sin((angle * Math.PI) / 180);
      const y = 50 - 50 * Math.cos((angle * Math.PI) / 180);
      return `polygon(50% 50%, 50% 0%, ${x}% ${y}%)`;
    } else {
      const x = 50 + 50 * Math.sin((angle * Math.PI) / 180);
      const y = 50 - 50 * Math.cos((angle * Math.PI) / 180);
      return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${x}% ${y}%)`;
    }
  }
}