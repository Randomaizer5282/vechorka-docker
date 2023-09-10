import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// @IpAddress() ip in controller
export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('request.connection.remoteAddress');
    console.log(request.connection.remoteAddress);
    console.log('request.headers["X-Real-IP"]');
    console.log(request.headers['x-real-ip']);
    console.log('request.headers["x-forwarded-for"]');
    console.log(request.headers['x-forwarded-for']);

    // const ip = request.connection.remoteAddress;
    return { user: request.user, ip: request.headers['x-forwarded-for'] };
  },
);
