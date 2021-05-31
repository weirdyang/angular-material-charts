import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HandsetService {
  private _isHandset = new Subject<boolean>();
  isHandset = this._isHandset.asObservable().pipe(shareReplay(1));

  constructor() { }

  setHandset(isHandset: boolean) {
    this._isHandset.next(isHandset)
  }
}
