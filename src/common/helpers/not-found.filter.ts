import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    console.log('Full Exception Response:', exceptionResponse);

    response.status(status).json({
      statusCode: status,
      message: (exceptionResponse as any).message || 'Not Found',
      error: (exceptionResponse as any).error || 'Not Found',
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
