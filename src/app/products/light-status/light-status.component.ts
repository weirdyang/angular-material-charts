import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Status } from '../config';
import { FakerService } from '../services/faker.service';


@Component({
  selector: 'cd-light-status',
  templateUrl: './light-status.component.html',
  styleUrls: ['./light-status.component.scss']
})
export class LightStatusComponent implements OnInit, OnDestroy, AfterContentInit {
  multi!: any[];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = false;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time (mins)';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Production';
  animations: boolean = true;
  seed = 2014;
  colorScheme = {
    domain: ['	#00FF00', '#FF0000', '#FFBF00', '#AAAAAA']
  };
  subscription!: Subscription;
  status = [Status.Up, Status.Stop, Status.Down];

  newLightStatus$ = this.fakerService.newLightStatus$
    .subscribe((val) => this.multi = [...this.multi, val]);

  maxLength: number = 100;

  constructor(private fakerService: FakerService) { }
  ngAfterContentInit(): void {
    this.fakerService.generateFakeLightStatus();
    this.fakerService.startFakeLightStatusStream();

  }
  ngOnDestroy(): void {
    this.fakerService.stopFakeLightStatusGeneration();
  }
  formatDate(date: string) {
    const monday = new Date(date);
    return monday.getSeconds();
  }
  ngOnInit(): void {
    this.multi = this.fakerService.getData();
  }

  onSelect(event: any) {
    console.log(event);
  }

}
