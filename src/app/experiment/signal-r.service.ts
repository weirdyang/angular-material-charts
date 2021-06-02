
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { ExperimentModule } from './experiment.module';
import { TestDocument } from './test-document';

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {

  private registerSignalEvents() {
    this.hubConnection.onclose(() => {
      this.hasRemoteConnection = false;
    });
    this.hubConnection.on('ReceiveUpdate', (data: TestDocument) => {
      console.log('update-service', data)

      this.updateSubject.next({
        name: data.name,
        id: data.id
      });
    });
    this.hubConnection.on('ReceiveCreate', (data: TestDocument) => {
      console.log('create-service', data)
      this.createSubject.next({
        name: data.name,
        id: data.id
      });
    });
    this.hubConnection.on('ReceiveDelete', (data: TestDocument) => {
      console.log('delete-service', data)
      this.deleteSubject.next(data);
    });
  }


  private updateSubject = new BehaviorSubject<TestDocument>(new TestDocument());
  updateAction$ = this.updateSubject.asObservable();


  private createSubject = new BehaviorSubject<TestDocument>(new TestDocument());
  createAction$ = this.createSubject.asObservable();


  private deleteSubject = new BehaviorSubject<TestDocument>(new TestDocument());
  deleteAction$ = this.deleteSubject.asObservable();

  public hasRemoteConnection: boolean = false;;
  private hubConnection!: signalR.HubConnection;

  constructor(private ngZone: NgZone) {

  }
  ngOnDestroy(): void {

  }
  // https://www.jerriepelser.com/blog/automatic-reconnects-signalr/
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl('https://localhost:5001/hubs/mysqltest')
      .withAutomaticReconnect()
      .build();
    this.hubConnection
      .start()
      .then(() => {
        this.hasRemoteConnection = true;
        this.registerSignalEvents();
      })
      .catch((err) => {
        this.hasRemoteConnection = false;
        console.log(err)
        setTimeout(() => {
          this.startConnection();
        }, 30000);
      });
  };
}


