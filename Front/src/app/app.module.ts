import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './shared/modules/layout.module';
import { JwtInterceptor } from './shared/jwt/jwt';
import { AllUsersComponent } from './pages/all.users/all.users.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/components/footer/footer/footer.component';
import { AllProductComponent } from './pages/all.product/all.product.component';
import { CardProductComponent } from './shared/components/card.product/card.product.component';
import { ProductByIdComponent } from './pages/product.by.id/product.by.id.component';
import { ProductsCrudComponent } from './pages/products-crud/products-crud.component';
import { ModalProductComponent } from './shared/components/modal-product/modal-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalErrorComponent } from './shared/components/modal-error/modal-error.component';
import { ModalModifyProductComponent } from './shared/components/modal-modify-product/modal-modify-product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PanierComponent } from './pages/panier/panier.component';
import { CardPanierComponent } from './shared/components/card-panier/card-panier.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ContactComponent,
    AllUsersComponent,
    FooterComponent,
    AllProductComponent,
    CardProductComponent,
    ProductByIdComponent,
    ProductsCrudComponent,
    ModalProductComponent,
    ModalErrorComponent,
    ModalModifyProductComponent,
    DashboardComponent,
    PanierComponent,
    CardPanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
