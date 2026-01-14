import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { MyordersComponent } from './myorders/myorders.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './admin/admin-edit-product/admin-edit-product.component';
import { AdminManageProductsComponent } from './admin/admin-manage-products/admin-manage-products.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductsComponent},
    { path: 'about', component: AboutComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'cart', component: CartComponent},
    { path: 'orders', component: MyordersComponent},
    { path: 'manage-products', component: AdminManageProductsComponent},
    { path: 'add-product', component: AdminAddProductComponent},
    { path: 'edit-product/:id', component: AdminEditProductComponent}
];
