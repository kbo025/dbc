import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch()
export class PrismaClientExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  constructor(readonly httpAdapterHost: HttpAdapterHost) {
    super();
  }

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    if (!(exception instanceof PrismaClientKnownRequestError)) {
      super.catch(exception, host);
    }

    switch (exception.code) {
      case 'P2002': {
        statusCode = HttpStatus.CONFLICT;
        httpAdapter.reply(
          response,
          { statusCode, error: 'CONFLICT', message: 'Record already exists' },
          statusCode,
        );
        break;
      }
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
