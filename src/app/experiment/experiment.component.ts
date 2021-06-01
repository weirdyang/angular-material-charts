import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'cd-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit {

  testComponent = WelcomeComponent
  ngOnInit(): void {
  }


}
