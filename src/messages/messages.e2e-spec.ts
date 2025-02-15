import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('MessagesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  it('/messages (POST)', async () => {
    const createDto = {
      senderId: 'uuid-sample',
      content: 'Hello, E2E!',
      replyTo: null,
    };

    const response = await request(app.getHttpServer())
      .post('/messages')
      .send(createDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.content).toEqual(createDto.content);
  });

  afterAll(async () => {
    await app.close();
  });
});
