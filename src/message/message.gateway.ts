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
  join(
    @MessageBody('username') username: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.messageService.addUser(username, client.id);
    this.sendPendingMessages(username);
  }

  @SubscribeMessage('privateMessage')
  privateMessage(@MessageBody() createMessage: CreateMessageDto) {
    const { sender, receiver, message, time } = createMessage;
    console.log(createMessage);

    const receiverClientId =
      this.messageService.getClientIdByUsername(receiver);
    if (receiverClientId) {
      this.server.to(receiverClientId).emit('newPrivateMessage', {
        sender,
        receiver,
        message,
        time,
      });
    } else {
      // Jika penerima tidak ada (tidak terhubung), simpan pesan dalam daftar tertunda
      this.messageService.addPendingMessage(receiver, createMessage);
    }
  }

  @SubscribeMessage('disconnect')
  disconnect(@ConnectedSocket() client: Socket) {
    const username = this.messageService.getUsernameByClientId(client.id);
    console.log(username);

    if (username) {
      this.messageService.removeUser(username);
    }
  }

  sendPendingMessages(username: string) {
    const clientId =
      this.messageService.getClientIdByUsernameOnPendingMessage(username);
    if (clientId) {
      const pendingMessages = this.messageService.getPendingMessages(username);
      if (pendingMessages.length > 0) {
        pendingMessages.forEach((messages) => {
          const { sender, receiver, message, time } = messages;
          this.server.to(clientId).emit('newPrivateMessage', {
            sender,
            receiver,
            message,
            time,
          });
        });

        // Setelah pesan tertunda terkirim, hapus dari daftar pesan tertunda
        this.messageService.deletePendingMessages(username);
      }
    }
  }
}
