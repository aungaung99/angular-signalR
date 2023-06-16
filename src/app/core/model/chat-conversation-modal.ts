import {ChatMessageModal} from "./chat-message-modal";

export interface ChatConversationModal {
  conversationId: string;
  conversationName: string;
  conversationType: string;
  lastMessage: string;
  lastSentOn: string;
  active: boolean;
  p2pUserId: string;
  messages: ChatMessageModal[]
}
