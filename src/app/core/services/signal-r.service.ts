import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpTransportType, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection!: signalR.HubConnection;
  private message$!: Subject<any>;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl("https://localhost:44378/hub/chat", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .withAutomaticReconnect([0, 10, 15, 30])
      .build();
  }

  connect(): void {
    this.connection.start().then((value) => {
      this.connection.invoke('GetConnectionId')
        .then((gValue) => {

          // Save ConnectionId to Session Storage
          window.sessionStorage.setItem('connectionId', gValue);

          // Send connectionId to server
          this.connection
            .invoke('CreateConnection', gValue, window.sessionStorage.getItem('userId'))
            .then((data) => {
              console.log(data)
            });
        })
    });
    this.connection.on('Status', data => console.log(data));
  }
}
