import { Chat, Store, UserId } from "./store";
let globalChatId = 0;

export interface Room {
  roomId: string;
  chats: Chat[];
}
export class InMemoryStore implements Store {
  private store: Map<string, Room>;
  constructor() {
    this.store = new Map<string, Room>();
  }
  initRoom(roomId: string) {
    this.store.set(roomId, {
      roomId,
      chats: [],
    });
  }
  getchats(roomId: string, limit: number, offset: number) {
    const room = this.store.get(roomId);
    if (!room) {
      return [];
    }
    return room.chats
      .reverse()
      .slice(0, limit)
      .slice(-1 * limit);
  }
  addChat(userId: UserId, name: string, message: string, roomId: string) {
    const room = this.store.get(roomId);
    if (!room) {
      return;
    }
    room.chats.push({
      id: (globalChatId++).toString(),
      userId,
      name,
      message,
      upvotes: [],
    });
  }
  upvote(userId: UserId, roomId: string, chatId: string) {
    const room = this.store.get(roomId);
    if (!room) {
      return;
    }
    const chat = room.chats.find(({ id }) => id === chatId);
    if (chat) {
      chat.upvotes.push(userId);
    }
  }
}
