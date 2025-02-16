import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ReplyMessageDto } from './dto/reply-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async createMessage(dto: CreateMessageDto) {
    return await this.prisma.message.create({
      data: {
        senderId: dto.senderId,
        content: dto.content,
        replyTo: dto.replyTo,
      },
    });
  }

  async updateMessage(id: string, dto: UpdateMessageDto) {
    const message = await this.prisma.message.findUnique({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    return await this.prisma.message.update({
      where: { id },
      data: {
        content: dto.content,
      },
    });
  }

  async deleteMessage(id: string) {
    const message = await this.prisma.message.findUnique({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    await this.prisma.message.delete({ where: { id } });
  }

  async replyMessage(replyToId: string, dto: ReplyMessageDto) {
    const original = await this.prisma.message.findUnique({
      where: { id: replyToId },
    });
    if (!original) {
      throw new NotFoundException(
        `Original message with id ${replyToId} not found`,
      );
    }
    return await this.prisma.message.create({
      data: {
        senderId: dto.senderId,
        content: dto.content,
        replyTo: replyToId,
      },
    });
  }
}
