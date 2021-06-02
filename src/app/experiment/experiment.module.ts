import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentRoutingModule } from './experiment-routing.module';
import { ExperimentComponent } from './experiment.component';
import { PortalOutletComponent } from './portal-outlet/portal-outlet.component';
import { PortalModule } from '@angular/cdk/portal';
import { SignalRService } from './signal-r.service';
import { CalculationService } from './calculation.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ExperimentComponent,
    PortalOutletComponent
  ],
  imports: [
    CommonModule,
    ExperimentRoutingModule,
    PortalModule,
    HttpClientModule,
  ],
  providers:
    []
})
export class ExperimentModule { }
