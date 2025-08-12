import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../dto/api-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    let message: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else if (
      typeof (errorResponse as { message: string }).message === 'string'
    ) {
      message = (errorResponse as { message: string }).message;
    } else {
      message = 'error occurred';
    }
    response.status(status).json(ApiResponse.error(message, String(status)));
  }
}
