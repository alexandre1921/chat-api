import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  senderId: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsUUID()
  replyTo?: string;
}
