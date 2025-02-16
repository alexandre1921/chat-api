# Chat API

## Project Overview

### Key Features
- JWT authenticated messaging operations (CRUD + replies)
- Input validation with class-validator 
- OpenAPI/Swagger documentation
- Prometheus metrics monitoring
- Structured logging with Winston
- Docker & Kubernetes deployment support

### Technology Stack
- Node.js 20.x
- NestJS 11
- TypeScript 5.x
- Prisma 6.x with PostgreSQL
- Docker & Docker Compose
- Kubernetes/Helm
- Prometheus & Winston

## Setup

### Prerequisites
```bash
node -v  # v20.x required
npm -v   # v10.x required
docker -v # v24.x required
```

### Local Development
```bash
# Clone repository
git clone <repo-url>
cd chat-api

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Start development environment
docker compose up -d     # Starts PostgreSQL
npm run prisma:generate # Generate Prisma client
npm run start:dev      # Start API in dev mode
```

## API Documentation 

Swagger UI is available at `/api-docs` when the application is running.

Key endpoints:
- POST /messages - Create message
- PUT /messages/:id - Update message
- DELETE /messages/:id - Delete message  
- POST /messages/:id/reply - Reply to message

## Observability

### Logging
Winston logger configured with:
```typescript
// filepath: src/logger/winston-logger.ts
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});
```

### Metrics
Prometheus metrics exposed at `/metrics`:
```typescript
// filepath: src/metrics/message.metrics.ts
import { Counter } from 'prom-client';

export const messageCounter = new Counter({
  name: 'messages_created_total',
  help: 'Total number of messages created'
});
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests  
npm run test:e2e

# Test coverage
npm run test:cov
```

## Future Improvements

- Add Redis caching layer
- Implement rate limiting
- Configure Kubernetes HPA
- Expand monitoring with custom metrics
- Add load testing suite
- Improve test coverage
