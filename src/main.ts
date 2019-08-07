import { NestFactory } from '@nestjs/core';
import { RootModule } from './module';

NestFactory.create(RootModule, {
  cors: {
    maxAge: 3600 * 8,
    origin: true,
  },
}).then(app => {
  app.setGlobalPrefix('/api');
  app.listen(8080);
});
