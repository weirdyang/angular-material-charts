import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDashComponent } from './order/order-dash/order-dash.component';
import { ProductDashboardComponent } from './products/product-dashboard/product-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'orders', loadChildren: () => import('./order/order-dash/order-dash.module').then(m => m.OrderDashModule)
  },
  {
    path: 'products', loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
  },
  { path: 'experiment', loadChildren: () => import('./experiment/experiment.module').then(m => m.ExperimentModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
