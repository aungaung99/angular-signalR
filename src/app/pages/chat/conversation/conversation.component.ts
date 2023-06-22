import {
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as signalR from "@microsoft/signalr";
import { ChatConversationModal } from 'src/app/core/model/chat-conversation-modal';
import { ChatMessageModal } from 'src/app/core/model/chat-message-modal';
import { ChatService } from 'src/app/core/services/chat.service';
import { SignalRService } from 'src/app/core/services/signal-r.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, AfterViewInit, AfterViewChecked {
  conversation: Partial<ChatConversationModal> = {};
  @ViewChild('messagesBox') messagesBox!: ElementRef<HTMLDivElement>;
  @ViewChild("textMessage") textMessage!: ElementRef<HTMLInputElement>;

  time_format: string = "h:mm a";
  isFetching: boolean = true;
  currentUserId: string = "";
  conversationId: string = "";
  constructor(
    private render: Renderer2,
    private chatService: ChatService,
    private signalRService: SignalRService,
    private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.messagesBox.nativeElement.style.height = `${screen.height - 363}px`;

    this.messagesBox.nativeElement.scrollTop = this.messagesBox.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.messagesBox.nativeElement.scrollTop = this.messagesBox.nativeElement.scrollHeight;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.conversationId = params['id'];
      this.chatService.getData(params['id'], 0, 100).subscribe((res) => {
        this.isFetching = false;
        this.conversation = res.data;
        this.messagesBox.nativeElement.scrollTop = 400;//this.messagesBox.nativeElement.scrollHeight;

        console.log("DIV Scrll TOP" + this.messagesBox.nativeElement.scrollTop);
        console.log("DIV Scroll Height" + this.messagesBox.nativeElement.scrollHeight);
      });
    });
    this.currentUserId = window.sessionStorage.getItem('userId') ?? '';

    this.signalRService.connection.on('ReceivedMessage', data => {
      console.log(data);
      let chatMessage: ChatMessageModal = data as ChatMessageModal;
      if(this.currentUserId!==chatMessage.userId){
        let messageUI = this.appendMessage(chatMessage.message, false);
        this.messagesBox.nativeElement.append(messageUI);
      }
      this.messagesBox.nativeElement.scrollTop = this.messagesBox.nativeElement.scrollHeight;
    });
  }

  onSubmit(): void {
  }

  sendMessage(): void {
    if (this.textMessage.nativeElement.value !== '') {
      let message = this.textMessage.nativeElement.value;
      this.messagesBox.nativeElement.append(this.appendMessage(message, true));
      this.signalRService.sendMessage(this.conversationId, message);
    }
    this.textMessage.nativeElement.value = '';

    this.messagesBox.nativeElement.scrollTop = this.messagesBox.nativeElement.scrollHeight;
  }

  sendImage(): void {

  }

  appendMessage(message: string, reverse: boolean): HTMLDivElement {
    const div_flex: HTMLDivElement = this.render.createElement('div');
    div_flex.classList.add('flex', 'mb-4');

    const div_space: HTMLDivElement = this.render.createElement('div');
    div_space.className = "flex-grow";
    div_space.classList.add(reverse ? "order-1" : "order-2");
    div_flex.append(div_space);

    const div_message_box: HTMLDivElement = this.render.createElement('div');
    div_message_box.classList.add(reverse ? "order-2" : "order-1");

    const div_message: HTMLDivElement = this.render.createElement('div');
    div_message.className = "bg-white border border-slate-100 drop-shadow-sm px-3 py-2 mb-2 rounded-lg";
    div_message.innerText = message;
    div_message_box.append(div_message);

    const div_sentOn: HTMLDivElement = this.render.createElement('div');
    div_sentOn.className = "flex gap-1 w-full";
    div_sentOn.classList.add(reverse ? "justify-end" : "justify-start");

    const icon = `<svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"></path>
    </svg>`;
    div_sentOn.innerHTML = reverse ? icon : '';

    const span_sentOn: HTMLSpanElement = this.render.createElement('span');
    span_sentOn.className = "text-xs";
    span_sentOn.innerText = new Date().toLocaleTimeString();
    div_sentOn.append(span_sentOn);

    div_message_box.append(div_sentOn);

    div_flex.append(div_message_box);
    return div_flex;
  }
}
