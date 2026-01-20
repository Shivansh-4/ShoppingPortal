import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedin = true;
  isAdmin = false;
  cartCount = 0;

  constructor( private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    const role = sessionStorage.getItem('role');
    this.isAdmin = role === 'Admin';

    this.cartService.cart$.subscribe(i => {
      this.cartCount = i.reduce((sum, c) => sum += c.quantity, 0)
    })
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.isLoggedin = false;
  }
}
