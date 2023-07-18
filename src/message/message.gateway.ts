import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = this.messageService.create(createMessageDto, client.id);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messageService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.messageService.identify(name, client.id);
    this.messageService.joinPrivateRoom(roomId, client.id);
    return this.messageService.getClientName(client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messageService.getClientName(client.id);
    const roomClients = this.messageService.getClientsInPrivateRoom(roomId);

    roomClients.forEach((clientId) => {
      this.server.to(clientId).emit('typing', { name, isTyping });
    });
  }

  @SubscribeMessage('privateMessage')
  privateMessage(
    @MessageBody('roomId') roomId: string,
    @MessageBody('message') message: string,
    @ConnectedSocket() client: Socket,
  ) {
    const name = this.messageService.getClientName(client.id);
    const roomClients = this.messageService.getClientsInPrivateRoom(roomId);

    roomClients.forEach((clientId) => {
      this.server.to(clientId).emit('privateMessage', { name, message });
    });
  }
}
