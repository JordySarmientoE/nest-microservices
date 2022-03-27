import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter{

    private readonly logger = new Logger(AllExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res: Response = ctx.getResponse();
        const req: Request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : 
            HttpStatus.INTERNAL_SERVER_ERROR;
        
        const msg = exception instanceof HttpException ? exception.getResponse() : exception;

        this.logger.error(`Status ${status} Error ${JSON.stringify(msg)}`)
    
        res.status(status).json({
            timestamps: new Date().toISOString(),
            path: req.url,
            error: msg
        })
    }

}