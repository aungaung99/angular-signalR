import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {HttpTransportType, LogLevel} from '@microsoft/signalr';
import {ChatService} from "../services/chat.service";
import {ChatConversationModal} from "../model/chat-conversation-modal";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('userId') userId!: ElementRef<HTMLInputElement>;
  @Input() signalConnection!: signalR.HubConnection;
  connectionId: string = '';
  status: string = '';
  conversation!: ChatConversationModal;

  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {
    let connection = new signalR.HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl("https://localhost:5001/hub/chat", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .withAutomaticReconnect([0, 10, 15, 30])
      .build();

    connection.start().then(() => {
      this.signalConnection = connection;
      connection.invoke('GetConnectionId')
        .then((value) => {
          this.connectionId = value;
        });
    });

    connection.on('Status', data => this.status = data ?? '');

    this.chatService
      .getData('1HEX-EGI2-J1R4-QC4X', 0, 20)
      .subscribe((res) => {
        this.conversation = res.data as ChatConversationModal;
      });
  }

  userIdChange(): void {
    let _userId = this.userId.nativeElement.value;
    console.log(_userId);
    this.signalConnection.invoke('CreateConnection', this.connectionId, _userId);
  }

  createConversation(): void {
    let _userId = this.userId.nativeElement.value;
    if (_userId !== undefined && _userId !== null && _userId !== '') {
      this.signalConnection.invoke('CreateFromBiker', this.connectionId, _userId, '1HEX-EGI2-J1R4-QC4X');
    }
  }
}
