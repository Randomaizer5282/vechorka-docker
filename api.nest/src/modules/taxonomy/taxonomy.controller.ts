import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TaxonomyService } from './taxonomy.service';
import { ApiKeyGuard } from '../../utils/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('taxonomies')
export class TaxonomyController {
  constructor(private readonly termService: TaxonomyService) {}

  @Get('/group')
  getTaxonomiesGroup() {
    return this.termService.getTaxonomiesGroup();
  }

  @Get(':taxonomy')
  getTaxonomy(@Param('taxonomy') taxonomy: string) {
    return this.termService.getTaxonomy(taxonomy);
  }

  @Get()
  getAllTaxonomies() {
    return this.termService.getTaxonomies();
  }
}
