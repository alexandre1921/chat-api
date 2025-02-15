import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [PrismaModule, MessagesModule],
})
export class AppModule {}
