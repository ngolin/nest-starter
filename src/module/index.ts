import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { X000Module } from './x000';
import { X001Module } from './x001';
import { User } from './x000/_entities/user';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // NOTE: not for production
      database: '/tmp/nest.sqlite',
      entities: [User],
      synchronize: true,
    }),
    X000Module,
    X001Module,
  ],
})
export class RootModule {}
