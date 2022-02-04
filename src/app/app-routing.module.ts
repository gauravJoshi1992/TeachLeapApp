import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import {ProductDetailComponent } from './product-detail/product-detail.component';
const routes: Routes = [
  {path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'home', component: HomeComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'aboutMe', component: AboutMeComponent}, 
  {path: 'product-detail/:id', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
