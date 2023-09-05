import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class TransformInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler<any>): import("rxjs").Observable<Record<string, any>>;
}
