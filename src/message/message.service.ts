import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  private readonly privateRooms: { [roomId: string]: string[] } = {};
  private readonly users = [];
  private readonly pendingMessages: { [username: string]: CreateMessageDto[] } =
    {};

  removeUser(id: string) {
    delete this.users[id];
  }

  addUser(username: string, clientId: string) {
    this.users[username] = clientId;
    console.log(this.users);
  }

  getClientIdByUsername(username: string): string | undefined {
    return this.users[username];
  }
  getClientIdByUsernameOnPendingMessage(username: string): string | undefined {
    if (this.pendingMessages[username]) {
      return this.getClientIdByUsername(username);
    }
  }

  getUsernameByClientId(clientId: string): string | undefined {
    return Object.keys(this.users).find((key) => this.users[key] === clientId);
  }

  addPendingMessage(username: string, message: CreateMessageDto) {
    if (!this.pendingMessages[username]) {
      this.pendingMessages[username] = [];
    }
    this.pendingMessages[username].push(message);
  }

  getPendingMessages(username: string): CreateMessageDto[] {
    return this.pendingMessages[username] || [];
  }

  getClientsInPrivateRoom(roomId: string) {
    return this.privateRooms[roomId] || [];
  }

  deletePendingMessages(username: string) {
    delete this.pendingMessages[username];
  }
}
