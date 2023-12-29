import { Chat, Store, UserId } from "./store/store";

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
      userId,
      name,
      message,
      upvotes: [],
    });
  }
  upvote(room: string, chatId: string) {}
}
