export type UserId = string;

export interface Chat {
  id: string;
  userId: UserId;
  name: string;
  message: string;
  upvotes: UserId[];
}

export abstract class Store {
  constructor() {}
  initRoom(roomId: string) {}
  getchats(room: string, limit: number, offset: number) {}
  addChat(userId: UserId, name: string, message: string, room: string) {}
  upvote(userId: UserId, name: string, room: string, chatId: string) {}
}
