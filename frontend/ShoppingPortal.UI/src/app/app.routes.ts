import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { MyordersComponent } from './myorders/myorders.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import { AdminManageProductsComponent } from './admin/admin-manage-products/admin-manage-products.component';
import { AdminEditProductComponent } from './admin/admin-edit-product/admin-edit-product.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductsComponent},

    { 
        path: 'cart', 
        component: CartComponent,
        canActivate: [authGuard]
    },

    {
        path: 'orders', 
        component: MyordersComponent,
        canActivate: [authGuard]
    },

    { 
        path: 'admin-add', 
        component: AdminAddProductComponent,
        canActivate: [adminGuard, authGuard]
    },

    { 
        path: 'admin-manage', 
        component: AdminManageProductsComponent,
        canActivate: [adminGuard, authGuard]
    },

    { 
        path: 'admin-edit/:id', 
        component: AdminEditProductComponent,
        canActivate: [adminGuard, authGuard]
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    }
];
