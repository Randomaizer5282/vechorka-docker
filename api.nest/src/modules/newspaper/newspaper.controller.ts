import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NewspaperService } from './newspaper.service';
import { NewspaperParamsDTO } from './newspaper.dto';
import { ApiKeyGuard } from '../../utils/guards/api-key.guard';

@Controller('newspaper')
export class NewspaperController {
  constructor(private readonly newspaperService: NewspaperService) {}

  @Get()
  getNewspapers(@Query() query: NewspaperParamsDTO) {
    return this.newspaperService.getNewspapersByYear(query);
  }
}
