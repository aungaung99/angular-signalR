import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpTransportType, LogLevel } from '@microsoft/signalr';
import { ChatService } from "../../core/services/chat.service";
import { ChatConversationModal } from "../../core/model/chat-conversation-modal";
import { SignalRService } from 'src/app/core/services/signal-r.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('userId') userId!: ElementRef<HTMLInputElement>;
  connectionId: string = '';
  status: string = '';
  conversation!: ChatConversationModal;

  constructor(private signalRService: SignalRService, private chatService: ChatService) {

  }

  ngOnInit(): void {
  }

  userIdChange(): void {
    let _userId = this.userId.nativeElement.value;
    console.log(_userId);
  }

  createConversation(): void {
    // let _userId = this.userId.nativeElement.value;
    // if (_userId !== undefined && _userId !== null && _userId !== '') {
    //   this.signalConnection.invoke('CreateFromBiker', this.connectionId, _userId, '1HEX-EGI2-J1R4-QC4X');
    // }
  }
}
