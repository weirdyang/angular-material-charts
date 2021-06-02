import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentComponent } from './experiment.component';
import { SignalrGuard } from './signalr.guard';

const routes: Routes = [
  {
    path: '',
    component: ExperimentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentRoutingModule { }