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

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('username') username: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.messageService.addUser(username, client.id);
  }

  @SubscribeMessage('privateMessage')
  privateMessage(@MessageBody() createMessage: CreateMessageDto) {
    const { sender, receiver, message, time } = createMessage;
    console.log(createMessage);

    this.server
      .to(this.messageService.getClientId(receiver))
      .emit('newPrivateMessage', {
        sender,
        receiver,
        message,
        time,
      });
  }
}
