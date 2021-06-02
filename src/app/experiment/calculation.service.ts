import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExperimentModule } from './experiment.module';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {


  private registerSignalEvents() {
    this.hubConnection.onclose(() => {
      this.hasRemoteConnection = false;
    });
    this.hubConnection.on('ReceiveTotalCount', (data) => {
      console.log(data);
      this.totalSubject.next(data);
    });
    this.hubConnection.on('ReceiveTotalNames', (data) => {
      console.log(data);
      this.uniqueSubject.next(data);
    });
  }


  private totalSubject = new Subject<number>();
  newTotal$ = this.totalSubject.asObservable();


  private uniqueSubject = new Subject<number>();
  newUnique$ = this.uniqueSubject.asObservable();


  public hasRemoteConnection: boolean = false;;
  private hubConnection!: signalR.HubConnection;

  constructor(private ngZone: NgZone) {

  }

  // https://www.jerriepelser.com/blog/automatic-reconnects-signalr/
  public startConnection = async () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Trace)
      .withUrl(environment.calculationHubUrl)
      .withAutomaticReconnect()
      .build();
    try {
      await this.hubConnection.start();
      this.registerSignalEvents();
      this.hasRemoteConnection = true;
    } catch (error) {
      this.hasRemoteConnection = false;
      console.log(error)
      setTimeout(() => {
        this.startConnection();
      }, 30000);
    }
    return this.hasRemoteConnection;
  };
  public stopConnection = async () => {
    try {
      await this.hubConnection.stop();
      this.hasRemoteConnection = false;
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
  public getNewTotals() {
    if (!this.hasRemoteConnection)
      return;

    this.hubConnection.invoke('GetTotalCount').catch(err => console.error(err));
    this.hubConnection.invoke('GetUniqueNames').catch(err => console.error(err));
  }
}