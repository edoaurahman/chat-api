import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  private privateRooms: { [roomId: string]: string[] } = {};
  private messages: Message[] = [{ name: 'Edo', text: 'Hello' }];
  private clientToUser = {};

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }

  createPrivateRoom(roomId: string) {
    this.privateRooms[roomId] = [];
  }

  joinPrivateRoom(roomId: string, clientId: string) {
    if (!this.privateRooms[roomId]) {
      this.privateRooms[roomId] = [];
    }
    this.privateRooms[roomId].push(clientId);
  }

  leavePrivateRoom(roomId: string, clientId: string) {
    if (this.privateRooms[roomId]) {
      this.privateRooms[roomId] = this.privateRooms[roomId].filter(
        (id) => id !== clientId,
      );
      if (this.privateRooms[roomId].length === 0) {
        delete this.privateRooms[roomId];
      }
    }
  }

  getClientsInPrivateRoom(roomId: string) {
    return this.privateRooms[roomId] || [];
  }
}
