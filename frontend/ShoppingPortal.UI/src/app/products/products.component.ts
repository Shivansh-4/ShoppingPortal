import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { CartService } from '../services/cart.service';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ɵInternalFormsSharedModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  loading = true;
  isAdmin = false;
  categoryMap: Map<number, string> = new Map();

  constructor(private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const role = sessionStorage.getItem('role');
    this.isAdmin = role === 'Admin';

    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        categories.forEach(cat => {
          this.categoryMap.set(cat.categoryId, cat.categoryName);
        });
        this.categories = categories.map(cat => cat.categoryName);
      },
      error: () => {
        console.log("Error loading categories");
      }
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: () => {
        alert("Error loading products");
      }
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.categoryName === this.selectedCategory;
      return matchesSearch && matchesCategory;
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
