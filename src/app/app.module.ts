import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/User/navbar/navbar.component';
import { HomeComponent } from './components/User/home/home.component';
import { CartComponent } from './components/User/cart/cart.component';
import { ProductsComponent } from './components/User/products/products.component';
import { CategoriesComponent } from './components/User/categoriesSlid/categories.component';
import { BrandsComponent } from './components/User/brands/brands.component';
import { NotfondComponent } from './components/User/notfond/notfond.component';
import { FooterComponent } from './components/User/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './layouts/signup/signup.component';
import { SigninComponent } from './layouts/signin/signin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductsdetailsComponent } from './components/User/productsdetails/productsdetails.component'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from "ngx-spinner";
import { SearchPipe } from './Core/pipes/search.pipe';
import { CheckOutComponent } from './components/User/check-out/check-out.component';
import { WishlistComponent } from './components/User/wishlist/wishlist.component';
import { AllorderComponent } from './components/User/allorder/allorder.component';
import { AddhaderInterceptor } from './Core/interceptors/addhader.interceptor';
import { MainIntroComponent } from './components/User/main-intro/main-intro.component';
import { NewArrlvalsComponent } from './components/User/new-arrlvals/new-arrlvals.component';
import { TopSellingComponent } from './components/User/top-selling/top-selling.component';
import { SiedNavBarComponent } from './components/User/sied-nav-bar/sied-nav-bar.component';
import { loadinginterceptor } from './Core/interceptors/loading.interceptor';
import { BrandSliedComponent } from './components/User/brand-slied/brand-slied.component';
import { SubCatgcoryComponent } from './components/User/sub-catgcory/sub-catgcory.component';
import { ProductByCategoryIdComponent } from './components/User/product-by-category-id/product-by-category-id.component';
import { ProductBYBrandIDComponent } from './components/User/product-bybrand-id/product-bybrand-id.component';
import { ProductBYSupcateigoryIDComponent } from './components/User/product-bysupcateigory-id/product-bysupcateigory-id.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NotfondComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    ProductsdetailsComponent,
    SearchPipe,
    CheckOutComponent,
    WishlistComponent,
    AllorderComponent,
    MainIntroComponent,
    NewArrlvalsComponent,
    TopSellingComponent,
    SiedNavBarComponent,
    BrandSliedComponent,
    SubCatgcoryComponent,
    ProductByCategoryIdComponent,
    ProductBYBrandIDComponent,
    ProductBYSupcateigoryIDComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddhaderInterceptor,
      multi: true,

    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: loadinginterceptor,
      multi: true,

    }


  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
