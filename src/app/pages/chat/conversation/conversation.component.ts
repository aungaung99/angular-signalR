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
import { ActivatedRoute } from '@angular/router';
import * as signalR from "@microsoft/signalr";
import { ChatConversationModal } from 'src/app/core/model/chat-conversation-modal';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  conversation: Partial<ChatConversationModal> = {};
  @ViewChild('messagesBox') messagesBox!: ElementRef<HTMLDivElement>;
  @ViewChild("textMessage") textMessage!: ElementRef<HTMLInputElement>;

  constructor(private render: Renderer2, private chatService: ChatService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.chatService.getData(params['id'], 0, 20).subscribe((res) => {
        this.conversation = res.data;
      });
    });

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
