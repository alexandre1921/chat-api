import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('MessagesService', () => {
  let service: MessagesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: PrismaService,
          useValue: {
            message: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createMessage', () => {
    it('should create a message', async () => {
      const createDto = {
        senderId: 'uuid-sample',
        content: 'Hello, World!',
        replyTo: null,
      };
      const createdMessage = {
        id: 'uuid-created',
        senderId: createDto.senderId,
        content: createDto.content,
        replyTo: createDto.replyTo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.message.create as jest.Mock).mockResolvedValue(createdMessage);

      const result = await service.createMessage(createDto);

      expect(result).toEqual(createdMessage);
      expect(prisma.message.create).toHaveBeenCalledWith({
        data: {
          senderId: createDto.senderId,
          content: createDto.content,
          replyTo: createDto.replyTo,
        },
      });
    });
  });

  describe('updateMessage', () => {
    it('should update a message if found', async () => {
      const id = 'uuid-message';
      const updateDto = { content: 'Updated Content' };
      const existingMessage = {
        id,
        senderId: 'uuid-sample',
        content: 'Old Content',
        replyTo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedMessage = {
        ...existingMessage,
        content: updateDto.content,
        updatedAt: new Date(),
      };

      (prisma.message.findUnique as jest.Mock).mockResolvedValue(
        existingMessage,
      );
      (prisma.message.update as jest.Mock).mockResolvedValue(updatedMessage);

      const result = await service.updateMessage(id, updateDto);
      expect(result).toEqual(updatedMessage);
      expect(prisma.message.findUnique).toHaveBeenCalledWith({ where: { id } });
      expect(prisma.message.update).toHaveBeenCalledWith({
        where: { id },
        data: { content: updateDto.content },
      });
    });

    it('should throw NotFoundException if message is not found', async () => {
      const id = 'non-existent-id';
      const updateDto = { content: 'Updated Content' };

      (prisma.message.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.updateMessage(id, updateDto)).rejects.toThrow();
    });
  });
});
