import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: '*',
      origin: '*',
    },
  });

  app.use(
    session({
      secret: 'my-secret',
      resave: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();
