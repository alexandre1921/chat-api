import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ReplyMessageDto } from './dto/reply-message.dto';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  const mockMessagesService = {
    createMessage: jest.fn((dto: CreateMessageDto) =>
      Promise.resolve({ id: '1', ...dto }),
    ),
    updateMessage: jest.fn((id: string, dto: UpdateMessageDto) =>
      Promise.resolve({ id, ...dto }),
    ),
    deleteMessage: jest.fn((id: string) => Promise.resolve()),
    replyMessage: jest.fn((id: string, dto: ReplyMessageDto) =>
      Promise.resolve({ id: '2', replyTo: id, ...dto }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessagesService,
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it('should create a message', async () => {
    const dto: CreateMessageDto = {
      senderId: 'uuid-sample',
      content: 'Hello, world!',
      replyTo: null,
    };

    const result = await controller.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
    expect(service.createMessage).toHaveBeenCalledWith(dto);
  });

  it('should update a message', async () => {
    const id = '1';
    const dto: UpdateMessageDto = { content: 'Updated Content' };

    const result = await controller.update(id, dto);
    expect(result).toEqual({ id, ...dto });
    expect(service.updateMessage).toHaveBeenCalledWith(id, dto);
  });

  it('should delete a message', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.deleteMessage).toHaveBeenCalledWith(id);
  });

  it('should reply to a message', async () => {
    const id = '1';
    const dto: ReplyMessageDto = {
      senderId: 'uuid-sample',
      content: 'Reply content',
    };

    const result = await controller.reply(id, dto);
    expect(result).toEqual({ id: '2', replyTo: id, ...dto });
    expect(service.replyMessage).toHaveBeenCalledWith(id, dto);
  });
});
