import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { CartService } from '../services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ɵInternalFormsSharedModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        alert("Error loading products");
      }
    });
  }

  addToCart(p: Product): void{
    if(!p.quantity || p.quantity <= 0) return;

    this.cartService.addToCart({
      productId: p.productId,
      productName: p.productName,
      price: p.price,
      quantity: p.quantity,
      imageUrl: p.imageUrl,
      stock: p.stock
    });
  }

  totalPrice(quantity: number, price: number): number{
    return quantity * price;
  }
}
