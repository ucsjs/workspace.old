import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor() {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();

        const httpStatus =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
        };
    }
}
  