import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-edit-product.component.html',
  styleUrl: './admin-edit-product.component.css'
})
export class AdminEditProductComponent implements OnInit {
  product: Product = {
    productId: 0,
    productName: '',
    description: '',
    categoryId: 0,
    categoryName: '',
    stock: 0,
    price: 0,
    imageUrl: '',
    quantity: 0
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.productService.getProduct(productId).subscribe(product => {
        this.product = product;
      });
    }
  }

  saveProduct(): void {
    this.productService.editProducts(this.product.productId, this.product).subscribe(() => {
      this.router.navigate(['/manage-products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/manage-products']);
  }
}