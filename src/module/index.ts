import { Module } from '@nestjs/common';
import { X000Module } from './x000';
import { X001Module } from './x001';

@Module({
  imports: [X000Module, X001Module],
})
export class RootModule {}
