import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrderDashModule } from './order/order-dash/order-dash.module';
import { ProductModule } from './products/product.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { WelcomeComponent } from './welcome/welcome.component';
import { ExperimentComponent } from './experiment/experiment.component';
import { ExperimentModule } from './experiment/experiment.module';
import { SignalRService } from './experiment/signal-r.service';
import { CalculationService } from './experiment/calculation.service';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    MatSlideToggleModule,
    ExperimentModule,
  ],
  providers:
  [SignalRService,
    {
      provide: APP_INITIALIZER,
      useFactory: (signal: SignalRService) => () => signal.startConnection(),
      deps: [SignalRService],
      multi: true,
    },
    CalculationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (calc: CalculationService) => () => calc.startConnection(),
      deps: [CalculationService],
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
