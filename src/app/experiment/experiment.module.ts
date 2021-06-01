import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentRoutingModule } from './experiment-routing.module';
import { ExperimentComponent } from './experiment.component';
import { PortalOutletComponent } from './portal-outlet/portal-outlet.component';
import { PortalModule } from '@angular/cdk/portal';


@NgModule({
  declarations: [
    ExperimentComponent,
    PortalOutletComponent
  ],
  imports: [
    CommonModule,
    ExperimentRoutingModule,
    PortalModule
  ]
})
export class ExperimentModule { }
