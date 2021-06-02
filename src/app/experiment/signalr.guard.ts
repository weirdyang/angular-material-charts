import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { forkJoin, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalculationService } from './calculation.service';
import { ExperimentComponent } from './experiment.component';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrGuard implements CanDeactivate<ExperimentComponent>, CanLoad {

  constructor(private signalrService: SignalRService, private calculationService: CalculationService) {

  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('in guard');
    return forkJoin(
      [this.signalrService.stopConnection(),
      this.calculationService.stopConnection()]
    ).pipe(
      map(t => t[0] === true && t[1] === true)
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('in guard');
    return forkJoin(
      [this.signalrService.startConnection(),
      this.calculationService.startConnection()]
    ).pipe(
      map(t => t[0] === true && t[1] === true)
    );
  }
}
