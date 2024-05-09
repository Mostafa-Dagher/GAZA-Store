import { AuthGuard } from './Core/guards/auth.guard';
import { SigninComponent } from './layouts/signin/signin.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { BrandsComponent } from './components/User/brands/brands.component';
import { CategoriesComponent } from './components/User/categoriesSlid/categories.component';
import { ProductsComponent } from './components/User/products/products.component';
import { CartComponent } from './components/User/cart/cart.component';
import { NotfondComponent } from './components/User/notfond/notfond.component';
import { HomeComponent } from './components/User/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsdetailsComponent } from './components/User/productsdetails/productsdetails.component';
import { CheckOutComponent } from './components/User/check-out/check-out.component';
import { WishlistComponent } from './components/User/wishlist/wishlist.component';
import { AllorderComponent } from './components/User/allorder/allorder.component';
import { SubCatgcoryComponent } from './components/User/sub-catgcory/sub-catgcory.component';
import { ProductByCategoryIdComponent } from './components/User/product-by-category-id/product-by-category-id.component';
import { ProductBYSupcateigoryIDComponent } from './components/User/product-bysupcateigory-id/product-bysupcateigory-id.component';
import { ProductBYBrandIDComponent } from './components/User/product-bybrand-id/product-bybrand-id.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },


  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'checkout/:id', canActivate: [AuthGuard], component: CheckOutComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  { path: 'products', canActivate: [AuthGuard], component: ProductsComponent },
  { path: 'productsdetails/:id', canActivate: [AuthGuard], component: ProductsdetailsComponent },
  { path: 'SubCatgcory/:id', canActivate: [AuthGuard], component: SubCatgcoryComponent },
  { path: 'productByCategoryId/:id', canActivate: [AuthGuard], component: ProductByCategoryIdComponent },
  { path: 'ProductBYSupcateigoryID/:id', canActivate: [AuthGuard], component: ProductBYSupcateigoryIDComponent },
  { path: 'ProductBYBrandID/:id', canActivate: [AuthGuard], component: ProductBYBrandIDComponent },
  { path: 'categories', canActivate: [AuthGuard], component: CategoriesComponent },
  { path: 'brand', canActivate: [AuthGuard], component: BrandsComponent },
  { path: 'wishlist', canActivate: [AuthGuard], component: WishlistComponent },
  { path: 'allorders', canActivate: [AuthGuard], component: AllorderComponent },





  { path: '**', component: NotfondComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
