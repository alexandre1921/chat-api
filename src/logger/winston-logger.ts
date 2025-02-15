import * as winston from 'winston';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('ChatAPI', {
          prettyPrint: true,
        }),
      ),
    }),
  ],
});
