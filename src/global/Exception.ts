import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export interface HintResponse {
  code: number;
  hint: string;
}

@Catch()
export class Exception implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const httpHint = (status: HttpStatus, message: string | object) => {
      if (typeof message === 'string') {
        return message;
      }
      if (message['error']) {
        return message['error'];
      }
      for (const [key, code] of Object.entries(HttpStatus)) {
        if (code === status) {
          return key;
        }
      }
      return message;
    };

    const context = host.switchToHttp();
    const response = context.getResponse();

    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const hint =
      exception instanceof Error
        ? httpHint(code, exception.message)
        : exception;

    response.status(code).json({
      code,
      hint,
    });
  }
}
