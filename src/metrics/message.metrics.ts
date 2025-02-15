// src/metrics/message.metrics.ts
import { Counter } from 'prom-client';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class MessageMetrics implements OnModuleInit {
  private readonly logger = new Logger(MessageMetrics.name);

  constructor(
    @InjectMetric('messages_created_total')
    private readonly messagesCreated: Counter<string>,
  ) {}

  onModuleInit() {
    this.logger.log(
      'MessageMetrics initialized. Counter "messages_created_total" is ready to use.',
    );

    this.messagesCreated.reset();
  }

  incrementMessagesCreated() {
    this.messagesCreated.inc();
  }
}
