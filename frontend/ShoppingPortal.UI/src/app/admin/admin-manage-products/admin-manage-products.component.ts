import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-manage-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-manage-products.component.html',
  styleUrl: './admin-manage-products.component.css'
})
export class AdminManageProductsComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  editProduct(id: number){
    this.router.navigate(['/admin-edit', id]);
  }

  removeProduct(id: number){
    if(confirm('Do you want to delete this product?')){
      this.productService.removeProduct(id).subscribe(() => {
        this.products = this.products.filter(i => i.productId !== id);
      })
    }
    
  }

}
