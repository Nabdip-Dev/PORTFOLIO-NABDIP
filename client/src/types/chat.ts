export interface ChatMessageData {
  _id?: string;
  sender: string; // user id
  text?: string;
  image?: { url: string };
  seen: boolean;
  seenAt?: string;
  createdAt?: string;
}

export interface ChatData {
  _id: string;
  visitor: string | { _id: string; name: string; email: string; isOnline?: boolean; lastSeen?: string };
  messages: ChatMessageData[];
  lastMessageAt: string;
}
