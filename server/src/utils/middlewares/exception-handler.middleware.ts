import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';

export class ExceptionHandlerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    console.log(exception.message);

    if (exception.name === 'TypeError') {
      response.status(500).json({ success: 'false', msg: 'Server failure!' });
      return;
    }

    if (exception.name === 'MongoServerError') {
      response.status(500).json({ success: 'false', msg: 'Server failure!' });
      return;
    }

    const error = exception.getResponse();
    const msg = this.getErrorMessage(error);

    const status = exception.getStatus();
    response.status(status).json({
      success: false,
      msg,
    });
    response.status(exception.getStatus()).json({
      success: false,
      msg: msg,
      stack: exception.stack,
    });
  }

  private getErrorMessage(error: any): string {
    if (Array.isArray(error.message)) {
      return this.formatValidationErrors(error.message);
    } else if (error.message) {
      return error.message;
    } else {
      return error.msg || 'Something went wrong!';
    }
  }

  private formatValidationErrors(errors: ValidationError[]): string {
    return errors.join(',\n');
  }
}
