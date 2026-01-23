import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { CartService } from '../services/cart.service';
import { RouterLink } from "@angular/router";
import { Category, CategoryService } from '../services/category.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  selectedCategoryFilter: number | null = null;
  isFiltered: boolean = false;
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private catService: CategoryService
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

    this.catService.GetCategories().subscribe(cats => {
      this.categories = cats;
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

  filterProductsByCat(CatId: number){

    if(!CatId){
      this.isFiltered = false;
      return;
    }

    this.productService.filterProducts(CatId).subscribe({
      next: (data) => {
        this.filteredProducts = data;
        this.isFiltered = true;
      },
      error: (err) => {
        alert('Could not Apply any filter');
      }
    });
  }

  get displayedProducts(){
    return this.isFiltered ? this.filteredProducts : this.products;
  }
}
