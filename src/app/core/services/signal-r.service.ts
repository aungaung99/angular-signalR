import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpTransportType, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs/internal/Subject';
import { SignalRModal } from '../model/signal-r-modal';
import { GlobalVarialbe } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public connection!: signalR.HubConnection;
  private message$!: Subject<any>;
  constructor() {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl(`${GlobalVarialbe.BASE_HUBCONNECTION_URL}/hub/chat`, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect([0, 5000, 150000, 300000])
        .build();
    }
    catch (e) {
    }
  }

  connect(): void {
    this.connection.start().then((value) => {
      this.connection.invoke('GetConnectionId')
        .then((gValue) => {

          // Save ConnectionId to Session Storage
          window.sessionStorage.setItem('connectionId', gValue);

          // Send connectionId to server
          this.connection
            .invoke('SaveConnection', gValue, window.sessionStorage.getItem('userId'))
            .then((data) => {
              console.log(data)
            });
        })
    });
    this.connection.on('Status', data => {
      console.log(data as SignalRModal);
    });

    //this.connection.on('ReceivedMessage', data => console.log(data));
  }

  async createConversation(initalMessage: string): Promise<any> {
    const connectionId = window.sessionStorage.getItem('connectionId');
    const userId = window.sessionStorage.getItem('userId');
    return await this.connection.invoke('CreateConversation', connectionId, userId, initalMessage, "");
  }

  async sendMessage(conversationId: string, message: string): Promise<any> {
    const connectionId = window.sessionStorage.getItem('connectionId');
    const userId = window.sessionStorage.getItem('userId');
    return await this.connection.invoke('SendMessage', connectionId, userId, conversationId, message);
  }
}
