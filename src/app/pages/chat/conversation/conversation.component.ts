import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { ChatConversationModal } from 'src/app/core/model/chat-conversation-modal';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() conversation: Partial<ChatConversationModal> = {};
  @Input() signalConnection!: signalR.HubConnection;
  @ViewChild('messagesBox') messagesBox!: ElementRef<HTMLDivElement>;
  @ViewChild("textMessage") textMessage!: ElementRef<HTMLInputElement>;

  constructor(private render: Renderer2) {
  }

  ngAfterContentInit(): void {
    console.log(this.signalConnection);
  }

  ngOnInit(): void {
    // this.signalConnection.invoke('GetConnectionId')
    //   .then((e) => {
    //     console.log(e);
    //   });

    console.log(this.signalConnection);
  }

  ngAfterViewInit() {

  }

  sendMessage(): void {
    let message = this.textMessage.nativeElement.value;
    this.messagesBox.nativeElement.append(this.appendMessage(message));
  }

  appendMessage(message: string): HTMLDivElement {
    const div: HTMLDivElement = this.render.createElement('div');
    div.classList.add('flex', 'mb-4');

    const span: HTMLDivElement = this.render.createElement('span');
    span.className = "col-span-2 bg-slate-300 px-3 py-2 rounded-lg";
    span.innerText = message;
    div.append((span));
    return div;
  }
}
