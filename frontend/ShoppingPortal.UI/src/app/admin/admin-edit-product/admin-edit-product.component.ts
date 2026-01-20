import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-edit-product.component.html',
  styleUrl: './admin-edit-product.component.css'
})
export class AdminEditProductComponent implements OnInit{

  product : Product= {
    productId: 0,
    productName: '',
    price: 0,
    categoryId: 0,
    description: '',
    imageUrl: '',
    stock: 0,
    quantity: 0,    
  };

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if(id){
        this.productService.getProductBygId(id).subscribe(data => {
        this.product = data;
      });
    }
  }

  saveProduct(): void{
    this.productService.editProduct(this.product.productId, this.product).subscribe(() => {
      this.router.navigate(['/admin-manage']);
    })
  }

  cancel(): void {
    this.router.navigate(['/admin-manage']);
  }
}
