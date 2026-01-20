import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.css'
})
export class AdminAddProductComponent implements OnInit{

  product = {
    productName: '',
    description: '',
    imageUrl: '',
    categoryId: 0,
    price: 0,
    stock: 0
  };
  categories: Category[] = [];
  isOpen = false;
  selectedCategoryName = '';

  constructor(private productService: ProductService, 
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.GetCategories().subscribe(data => {
      this.categories = data;
    });
  }

  addProduct(){
    this.productService.addProduct(this.product).subscribe({
      next: (res) => {
        alert('Product Added');
        this.router.navigate(['/admin-manage']);
      },
      error: (err) => {
        alert('Error adding product');
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/admin-manage']);
  }

  toggleDropdown(){
    this.isOpen = !this.isOpen;
  }

  selectCategory(cat: any){
    this.product.categoryId = cat.categoryId;
    this.selectedCategoryName = cat.categoryName;
    this.isOpen = false;
  }
}
