
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  public startConnection = async () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(environment.testDocumentUrl)
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
}


