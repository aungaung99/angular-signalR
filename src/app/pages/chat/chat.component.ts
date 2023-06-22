import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {HttpTransportType, LogLevel} from '@microsoft/signalr';
import {ChatService} from "../../core/services/chat.service";
import {ChatConversationModal} from "../../core/model/chat-conversation-modal";
import {SignalRService} from 'src/app/core/services/signal-r.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('intialMessage') intialMessage!: ElementRef<HTMLInputElement>;
  connectionId: string = '';
  status: string = '';
  conversation!: ChatConversationModal;

  constructor(private signalRService: SignalRService, private router: Router) {
  }

  ngOnInit(): void {
  }

  createConversation(): void {
    this.signalRService.createConversation(this.intialMessage.nativeElement.value, "DFH2-XR9L-0SAY-Y31X")
      .then((res) => {
        this.router.navigate(['./chat/conversation'],
          {queryParams: {id: res}})
      });
  }
}
