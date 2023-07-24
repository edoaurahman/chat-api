import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  private privateRooms: { [roomId: string]: string[] } = {};
  private users = [];

  getClientsInPrivateRoom(roomId: string) {
    return this.privateRooms[roomId] || [];
  }

  addUser(username: string, clientId: string) {
    this.users[username] = clientId;
    console.log(this.users);
  }

  getClientId(username: string) {
    return this.users[username];
  }
}
