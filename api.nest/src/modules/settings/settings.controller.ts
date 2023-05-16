import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('common')
  getCommon() {
    return this.settingsService.getCommon();
  }
}
