import { NestFactory } from '@nestjs/core';
import { RootModule } from './module';
import { options } from './global/options';
import { Transform } from './global/Transform';

NestFactory.create(RootModule, options).then(app => {
  app.useGlobalInterceptors(new Transform());
  app.setGlobalPrefix('/api');
  app.listen(8080);
});
