import { Module } from '@nestjs/common';
import { X000Module } from './x000';

@Module({
  imports: [X000Module],
})
export class RootModule {}
