import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDashComponent } from './order/order-dash/order-dash.component';
import { ProductDashboardComponent } from './products/product-dashboard/product-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'orders', component: OrderDashComponent
  },
  {
    path: 'products', component: ProductDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
