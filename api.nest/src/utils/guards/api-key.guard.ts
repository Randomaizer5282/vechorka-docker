import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const headerApiKey = req.headers['x-api-key'] ?? req.query.api_key; // checks the header, moves to query if null
    const apiKey = this.configService.get('apiKey');
    if (!headerApiKey || headerApiKey !== apiKey) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
