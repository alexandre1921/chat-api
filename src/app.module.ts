import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
    PrismaModule,
    MessagesModule,
  ],
})
export class AppModule {}
