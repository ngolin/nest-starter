import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DataResponse<T> {
  code: number;
  data: T;
}

@Injectable()
export class Transform<T> implements NestInterceptor<T, DataResponse<T>> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<DataResponse<T>> {
    return next.handle().pipe(map(data => ({ code: 0, data })));
  }
}
