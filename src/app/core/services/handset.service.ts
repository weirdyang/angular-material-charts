import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandsetService {
  private _isHandset = new BehaviorSubject<boolean>(false);
  isHandset = this._isHandset.asObservable();

  constructor() { }

  setHandset(isHandset: boolean) {
    this._isHandset.next(isHandset)
  }
}
