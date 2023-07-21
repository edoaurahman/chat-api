import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './config/ormconfig';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MessageModule,
    UserModule,
    TypeOrmModule.forRoot(ormconfig),
    MailerModule.forRoot({
      transport: `smtps://${process.env.SMTP_USERNAME}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
