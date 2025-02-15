import { IsUUID, IsString } from 'class-validator';

export class ReplyMessageDto {
  @IsUUID()
  senderId: string;

  @IsString()
  content: string;
}
