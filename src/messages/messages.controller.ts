import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ReplyMessageDto } from './dto/reply-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({ status: 201, description: 'Message created successfully.' })
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates the content of an existing message' })
  @ApiResponse({ status: 200, description: 'Message updated successfully.' })
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.updateMessage(id, updateMessageDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a message' })
  @ApiResponse({ status: 204, description: 'Message deleted successfully.' })
  async remove(@Param('id') id: string) {
    await this.messagesService.deleteMessage(id);
  }

  @Post(':id/reply')
  @ApiOperation({ summary: 'Reply to an existing message' })
  @ApiResponse({ status: 201, description: 'Response created successfully.' })
  async reply(
    @Param('id') id: string,
    @Body() replyMessageDto: ReplyMessageDto,
  ) {
    return this.messagesService.replyMessage(id, replyMessageDto);
  }
}
