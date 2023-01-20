import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AllUsersComponent } from './pages/all.users/all.users.component';
import { GuardGuard } from './shared/guard/guard.guard';
import { UserTypeGuard } from './shared/guard/user.type.guard';
import { AllProductComponent } from './pages/all.product/all.product.component';
import { ProductByIdComponent } from './pages/product.by.id/product.by.id.component';
import { ProductsCrudComponent } from './pages/products-crud/products-crud.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PanierComponent } from './pages/panier/panier.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [GuardGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'users', component: AllUsersComponent, canActivate: [UserTypeGuard], data: { userType: 1 } },
  { path: 'products', component: AllProductComponent },
  { path: 'product/:id', component: ProductByIdComponent },
  { path: 'product', component: ProductsCrudComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'panier', component: PanierComponent },
  { path: '**', redirectTo: '' }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
