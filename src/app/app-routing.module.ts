import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDashComponent } from './order/order-dash/order-dash.component';
import { ProductDashboardComponent } from './products/product-dashboard/product-dashboard.component';

const routes: Routes = [
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
