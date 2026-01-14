import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-manage-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-manage-products.component.html',
  styleUrl: './admin-manage-products.component.css'
})
export class AdminManageProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(productId).subscribe(() => {
        this.products = this.products.filter(p => p.productId !== productId);
      });
    }
  }
}