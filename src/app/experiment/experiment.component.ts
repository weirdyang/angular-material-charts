import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { WelcomeComponent } from '../welcome/welcome.component';
import { CalculationService } from './calculation.service';
import { SignalRService } from './signal-r.service';

@Component({
  selector: 'cd-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit, AfterViewInit {

  testComponent = WelcomeComponent


  constructor(private signalrService: SignalRService, private calculationService: CalculationService) {

  }
  // https://mfcallahan.blog/2020/11/05/how-to-implement-signalr-in-a-net-core-angular-web-application/
  ngAfterViewInit(): void {
  }

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  created$ = this.signalrService.createAction$
    .pipe(
      tap(val => this.calculationService.getNewTotals()),
      catchError(err => {
        return EMPTY
      })
    );
  created: any;
  updated$ = this.signalrService.updateAction$
    .pipe(
      tap(val => this.calculationService.getNewTotals()),
      catchError(err => {
        return this.processError(err);
      })
    );

  deleted$ = this.signalrService.deleteAction$
    .pipe(
      tap(val => console.log(val)),
      tap(val => this.calculationService.getNewTotals()),
      catchError(err => {
        return this.processError(err);
      })
    )

  total$ = this.calculationService.newTotal$
    .pipe(
      tap(val => console.log(val)),
      catchError(err => {
        return this.processError(err);
      })
    )

  unique$ = this.calculationService.newUnique$
    .pipe(
      catchError(err => {
        return this.processError(err);
      })
    )
  ngOnInit(): void {
  }

  processError(err: any) {
    this.errorMessageSubject.next(err);
    return EMPTY;
  }
}

