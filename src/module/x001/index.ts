import { Module } from '@nestjs/common';
import { TestService } from './_service';
import { TestController } from './_controller';
import { X000Module } from '../x000';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [X000Module],
})
export class X001Module {}
