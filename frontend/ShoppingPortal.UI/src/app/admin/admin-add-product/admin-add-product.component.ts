import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.css'
})
export class AdminAddProductComponent {
  product = {
    productName: '',
    description: '',
    categoryId: 0,
    stock: 0,
    price: 0,
    imageUrl: ''
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(() => {
      this.router.navigate(['/manage-products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/manage-products']);
  }
}